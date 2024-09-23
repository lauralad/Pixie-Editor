// https://ui.shadcn.com/docs/components/form
"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { use, useEffect, useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
import { set } from "mongoose"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModel } from "./InsufficientCreditsModel"
  


//validation schema, fields and inputs
export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string()
    // username: z.string().min(2).max(50),
})

const TransformationForm = ({action, data = null, userId, type, creditBalance, config = null}:TransformationFormProps) => {
    const transformationType = transformationTypes[type];
    const [image, setImage] = useState(data)
    // using | for typescript, not || 
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isTransforming, setIsTransforming] = useState(false)
    const [transformationConfig, setTransformationConfig] = useState(config)
    const [isPending, startTransition] = useTransition()
    const router = useRouter();

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        setIsSubmitting(true);
        if(data || image) {
            const transfURL = getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig
            })

            const imageData = {
                title: values.title,
                publicId: values.publicId,
                transformationType: type,
                width: image?.width,
                height: image?.height,
                config: transformationConfig,
                secureURL: image?.secureURL, //where image is stored
                transformationURL: transfURL,
                aspectRatio: values.aspectRatio, //from the form
                prompt: values.prompt,
                color: values.color
            }

            if(action === 'Add') {
                //add image
                try {
                    const newImage = await addImage({
                        image: imageData,
                        userId,
                        path: '/'
                    })

                    if(newImage) {
                        form.reset();
                        setImage(data);
                        router.push(`/transformations/${newImage._id}`)
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            if (action === 'Update') {
                try {
                    const updatedImage = await updateImage({
                        image: {
                            ...imageData,
                            _id: data._id
                        },
                        userId,
                        path: `/transformations/${data._id}`
                    })

                    if(updatedImage) {
                        // form.reset();
                        // setImage(data);
                        router.push(`/transformations/${updatedImage._id}`)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        setIsSubmitting(false);
    }

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prevState: any) => ({
        ...prevState,
        aspectRatio: imageSize.aspectRatio,
        width: imageSize.width,
        height: imageSize.height,
        }))

        setNewTransformation(transformationType.config);

        return onChangeField(value)
    }

    const onInputChangeHandler = (field: string, value: string, type: string, onChangeField: (value: string) => void) => {
        //waits a specific amount of time (1sec) before submitting the entry
        //less stress on server, less requests made
        debounce(() => {
            setNewTransformation((prevState: any) => ({
              ...prevState,
              //modify the type of the prev transformation to...
              [type]: {
                ...prevState?.[type],
                [field === 'prompt' ? 'prompt' : 'to' ]: value 
              }
            }))
        }, 1000)();
            
        return onChangeField(value)
    }

    const onTransformHandler = async () => {
        setIsTransforming(true)

        setTransformationConfig(
        //merge the new transformation with the current transformation config by keys
        deepMergeObjects(newTransformation, transformationConfig)
        )

        //transform done, ste to null
        setNewTransformation(null)

        //charge credit free and update user balance after transform
        startTransition(async () => {
            await updateCredits(userId, creditFee)
        })
    }

    useEffect(() => {
        if(image && (type === 'restore' || type === 'removeBackground')) {
            setNewTransformation(transformationType.config)
        }
    }, [image, transformationType.config, type])
    //dependency array, look for chanhes in these things

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModel />}
            <CustomField 
                control={form.control}
                name="title"
                formLabel="Image Title"
                className="w-full"
                render={({field}) => <Input {...field} className="input field"/>}
            />

            {type === 'fill' && (
                <CustomField 
                    control={form.control}
                    name="aspectRatio"
                    formLabel="Aspect Ratio"
                    className="w-full"
                    render={({field}) => (
                        <Select
                            onValueChange={(value) => 
                                onSelectFieldHandler(value, field.onChange)}
                                value={field.value}
                        >
                        <SelectTrigger className="select-field">
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(aspectRatioOptions).map((key) => (
                                <SelectItem key={key} value={key} className="select-item">
                                    {aspectRatioOptions[key as AspectRatioKey].label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                
                />
            )}

            {(type === "remove" || type === "recolor") && (
                <div className="prompt-field">
                    <CustomField 
                        control={form.control}
                        name="prompt"
                        formLabel={
                            type === "remove" ? "Object to remove" : "Object to recolor"
                        }
                        className="w-full"
                        render={({field}) => 
                            <Input 
                                value={field.value}
                                className="input-field"
                                onChange={(e) => onInputChangeHandler(
                                    'prompt', 
                                    e.target.value,
                                    type, 
                                    field.onChange)}
                            />}
                    />
                    {type === 'recolor' && (
                        <CustomField 
                            control={form.control}
                            name="color"
                            formLabel="Replacement Color"
                            className="w-full"
                            render={({field}) => 
                                <Input 
                                    value={field.value}
                                    className="input-field"
                                    onChange={(e) => onInputChangeHandler(
                                        'color', 
                                        e.target.value,
                                        'recolor', 
                                        field.onChange)}
                                />}
                        />
                    )}
                </div>
            )}

            <div className="media-uploader-field">
                <CustomField 
                    control={form.control}
                    name="publicId"
                    className="flex size-full flex-col"
                    render={({field}) => 
                        <MediaUploader 
                            onValueChange={field.onChange}
                            setImage={setImage}
                            publicId={field.value}
                            type={type}
                            image={image}
                        
                        />
                    }
                />

                <TransformedImage 
                    image={image}
                    type={type}
                    title={form.getValues().title}
                    isTransforming={isTransforming}
                    setIsTransforming={setIsTransforming}
                    transformationConfig={transformationConfig}
                />
            </div>

            <div className="flex-col gap-4">
                <Button 
                    type='button'
                    className="submit-button capitalize"
                    disabled={isTransforming || newTransformation === null}
                    onClick={onTransformHandler}
                >
                    {isTransforming ? 'Transforming...' : 'Apply transformation'}
                </Button>


                <Button 
                    type='submit'
                    className="submit-button capitalize mt-4"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Save image'}
                </Button>

            </div>

            
            </form>
        </Form>
    )
}

export default TransformationForm