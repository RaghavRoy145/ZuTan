import { CircularProgress } from '@material-ui/core';

const Loading = () => {
    return <div className="absolute h-full w-full flex flex-col justify-center items-center">
        <CircularProgress color="success" />
        <p className="text-2xl mt-16 text-green-400">Loading</p>
    </div>
}

export default Loading;