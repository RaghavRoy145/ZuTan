import { CircularProgress } from '@material-ui/core';

const Loading = (props) => {
    return <div className="absolute h-full w-full flex flex-col justify-center items-center">
        <CircularProgress color="success" />
        <p className="text-2xl mt-16 text-green-400">{props.text || 'Loading'}</p>
    </div>
}

export default Loading;