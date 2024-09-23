"use client"
import React from 'react'
import Image  from 'next/image'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

// declare type TransformedImageProps = {
//     image: any;
//     type: string;
//     title: string;
//     transformationConfig: Transformations | null;
//     isTransforming: boolean;
//     hasDownload?: boolean;
//     setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
// };



const TransformedImage = ({image, 
                        type, 
                        title, 
                        isTransforming, 
                        setIsTransforming, 
                        transformationConfig, 
                        hasDownload=false}: TransformedImageProps) => {
    
    const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        download(getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transformationConfig

        }), title)
    }
    return (
        <div className='flex-col gpa-4 flex'>
            <div className='flex-between'>
                <h3 className='h3-bold text-dark-600'>
                    Transformed
                </h3>

                {hasDownload && (
                    <button className='download-btn' onClick={(e)=>downloadHandler(e)}>
                        {/* Download image */}
                        <Image 
                            src='/assets/icons/download.svg'
                            alt='Download'
                            width={24}
                            height={24}
                            className='pb-[6px]'
                        />
                    </button>
                )}

            </div>
            {image?.publicId && transformationConfig ? (
                <div className='relative mt-4'>
                    <CldImage 
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt={image.title}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="transformed-image"
                        onLoad={()=>{
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={()=>{
                            debounce(()=>{
                                setIsTransforming && setIsTransforming(false);
                            }, 8000)()
                        }}

                        {...transformationConfig}

                    />
                    {isTransforming && (
                        <div className='transforming-loader'>
                            <Image 
                                src='/assets/icons/spinner.svg'
                                alt='loading'
                                width={50}
                                height={50}
                                className='transforming-loader-icon'
                            />
                            <p className='text-white/80'>Please wait...</p>
                        </div>
                    )}
                </div>
            ):
            (
                <div className='transformed-placeholder mt-4'>
                    Transformed Image
                </div>
            )}
        </div>
  )
}

export default TransformedImage