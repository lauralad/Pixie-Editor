

# Pixie Editor - AI Full Stack SaaS Platform

Pixie Editor leverages multiple tools to offer a full-stack platform where people can upload images that can be edited with AI. With options varying from background/object removal, object recoloring, generative filling, or image restoration, clients can purchase the necessary credits to utilize these tools via secure Stripe checkout. The deployed app can be accessed via https://pixie-editor.vercel.app or by cloning the repository following the steps below.

## Technologies Used

* **Next.js** - React-based framework for building web apps
* **TypeScript** - superset of JavaScript that adds static typing
* **MongoDB** - database management 
* **Clerk** - user authentication and management service
* **Cloudinary** - cloud-based AI image editing service
* **Stripe** - secure payment processing service
* **Shadcn** -  UI framework for building accessible and customizable UI elements
* **TailwindCSS** - utility-first CSS framework used for styling the app

## Features

* **User Authentication and Authorization**: Ensure secure user access through registration, login, and protected routes.

* **Community Gallery**: Browse and explore user image transformations with pagination for easy navigation.

* **Enhanced Image Search**: Quickly locate images based on specific content or objects within the image.

* **Image Restoration**: Effortlessly restore and enhance old or damaged photos.

* **Image Recoloring**: Easily modify image colors by replacing objects with custom colors.

* **Generative Image Fill**: Seamlessly complete missing sections of images.

* **Object Removal**: Precisely remove unwanted elements from images.

* **Background Removal**: Effortlessly extract objects from image backgrounds.

* **Download Edited Images**: Conveniently save and share AI-modified images.

* **Image Transformation Details**: View specific information related to each image transformation.

* **Transformation Management**: Manage image transformations with options for deletion and updates.

* **Credit Currency System**: Earn or buy credits to unlock image transformation features.

* **User Profile**: Access your transformed images and track available credits.

* **Credit Purchase**: Securely buy credits using Stripe for continued access to features.

* **Responsive Design**: Enjoy a smooth and intuitive interface across various devices.

## Instructions to run the app locally

### Step 1

Close the repository 
```
git clone https://github.com/lauralad/Pixie-Editor.git
cd pixie-editor
```

### Step 2
Install dependencies
```
npm install
```

### Step 3
You will need to make an account for each of the following services in order to retrieve the necessary environment variables below:
* [Clerk](https://clerk.com/)
* [MongoDB](https://www.mongodb.com/)
* [Cloudinary](https://cloudinary.com/)
* [Stripe](https://stripe.com/)

Create a file named ```.env.local``` in the root of the project folder and paste the following content:
```
#NEXT
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

#MONGODB
MONGODB_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```
### Step 4
Run ```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next Steps

* Implement personal AI image editor script and connect to the platform
* Implement Docmunent Scanner script to also include this service for photo documents

