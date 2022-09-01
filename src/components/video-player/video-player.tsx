import { useEffect, useRef } from 'react';
import { Film } from '../../types/film';

type Props = {
  film: Film;
  isPlay: boolean;
}

function VideoPlayer({film, isPlay}: Props): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if(videoRef.current !== null) {
      if(isPlay) {
        videoRef.current.play();
      }else {
        videoRef.current.load();
      }
    }
  }, [isPlay, film.posterImage]);

  return (
    <video src={film.previewVideoLink} className="player__video" poster={film.posterImage} loop ref={videoRef} muted />
  );
}

export default VideoPlayer;
