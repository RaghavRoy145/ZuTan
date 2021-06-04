import { CircularProgress } from '@material-ui/core';

const Loading = () => {
    return <div className="absolute h-full w-full flex flex-col justify-center items-center">
        <CircularProgress color="secondary" />
        <p className="text-2xl mt-16 text-gray-400">Loading</p>
        <p className="text-xl mt-8 text-gray-800">Getting Started? <span className="text-pink-500 cursor-pointer" onClick={() => window.location.href = "https://docs.loganywhere.dev"}>Make sure to check out our Docs</span></p>
    </div>
}

export default Loading;