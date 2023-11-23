import { useState, useRef, useEffect, ReactEventHandler } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb';
import { BsArrowsFullscreen } from 'react-icons/bs';

interface Props {
    videoSource: string,
    currentTime: number,
    handleProgress: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => Promise<void>
}

import styles from './videoPlayer.module.css';

const VideoPlayer = ({ videoSource, currentTime, handleProgress }: Props) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [videoPercentage, setVideoPercentage] = useState<number>(0);
    const [areControlsVisible, setAreControlsVisible] = useState<boolean>(false);
    const [varTimeout, setVarTimeout] = useState<number | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = currentTime * 60;
        }
    }, [videoSource, currentTime]);

    function handleMouseEnter() {
        setAreControlsVisible(true);
    }

    function handleMouseLeave() {
        setAreControlsVisible(false);
    }

    function handleMouseActivity() {
        if (varTimeout) {
            clearTimeout(varTimeout);
        }

        setAreControlsVisible(true);

        const timeout = setTimeout(() => setAreControlsVisible(false), 5000);
        setVarTimeout(timeout);
    }

    function togglePlay() {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
        }
        else {
            video.pause();
        }
        setIsPlaying(!video.paused);
    }

    function changeVolume(e: React.ChangeEvent) {
        const slider = e.target as HTMLInputElement;
        const video = videoRef.current;
        if (!video) return;
        video.volume = parseFloat(slider.value);
        setVolume(video.volume);
    }

    function changePlaybackRate(e: React.ChangeEvent) {
        const slider = e.target as HTMLInputElement;
        const video = videoRef.current;
        if (!video) return;
        video.playbackRate = parseFloat(slider.value);
        setPlaybackRate(video.playbackRate);
    }

    function skip(e: React.MouseEvent) {
        let button;
        const clicked = e.target as HTMLElement;
        if (clicked.tagName === 'svg') {
            button = clicked.closest('button');
        }
        else {
            button = clicked;
        }
        const skipTime = parseFloat(button!.dataset.skip as string);
        if (videoRef.current) {
            videoRef.current.currentTime += skipTime;
        }
    }

    const handleTimeProgress: ReactEventHandler<HTMLVideoElement> = async (e) => {
        if (videoRef.current && progressRef.current) {
            const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setVideoPercentage(percent);
        }
        await handleProgress(e);
    }

    function skipWithBar(e: React.MouseEvent) {
        if (videoRef.current && progressRef.current) {
            const clickedTime = (e.nativeEvent.offsetX / progressRef.current.offsetWidth) * videoRef.current.duration;
            videoRef.current.currentTime = clickedTime;
        }
    }

    function toggleFullscreen() {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            else {
                videoRef.current.requestFullscreen();
            }
        }
    }

    return (
        <div onMouseMove={handleMouseActivity} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} aria-label='Video Player' className={styles.player}>
            <video onTimeUpdate={handleTimeProgress} ref={videoRef} onClick={togglePlay} className={styles.player__video} src={videoSource}></video>
            <div style={{ opacity: areControlsVisible ? '100%' : '0%' }} className={styles.player__controls}>
                <div ref={progressRef} onClick={skipWithBar} className={styles.player__progress}>
                    <div style={{ width: `${videoPercentage}%` }} className={styles.progress__filled}></div>
                </div>
                <div className={styles.player__buttons}>
                    <button onClick={togglePlay} className={styles.player__button} title='Toggle play'>
                        {
                            isPlaying ? <FaPause /> : <FaPlay />
                        }
                    </button>
                    <input
                        title='Change volume'
                        type="range"
                        className={styles.player__slider}
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={changeVolume}
                    />
                    <input
                        title='Change video speed'
                        type="range"
                        className={styles.player__slider}
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={playbackRate}
                        onChange={changePlaybackRate}
                    />
                    <button onClick={skip} data-skip='-10' className={styles.player__button} title='Skip 10 seconds back'>
                        <TbRewindBackward10 />
                    </button>
                    <button onClick={skip} data-skip='10' className={styles.player__button} title='Skip 10 seconds ahead'>
                        <TbRewindForward10 />
                    </button>
                    <button onClick={toggleFullscreen} title='Toggle fullscreen' className={styles.player__button}>
                        <BsArrowsFullscreen />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
