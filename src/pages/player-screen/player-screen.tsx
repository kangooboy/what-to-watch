import { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction } from '../../store/api-action';
import PreLoader from '../../components/pre-loader/pre-loader';
import { getFilm } from '../../store/film-data/selectors';
import { getIsFilmLoading } from '../../store/film-data/selectors';

import sf from 'seconds-formater';

function PlayerScreen() {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getIsFilmLoading);

  useEffect(() => {
    if(id) {
      dispatch(fetchFilmAction(id));
    }
  }, [id, dispatch]);

  const handleExitPlayerClick = () => {
    navigate(-1);
  };

  const handlePlayVideoClick = () => {
    if(videoRef.current && isPlay) {
      setIsPlay(!isPlay);
      return videoRef.current.pause();
    }
    if(videoRef.current && !isPlay) {
      setIsPlay(!isPlay);
      return videoRef.current.play();
    }
  };

  const handleProgress = (evt: SyntheticEvent<HTMLVideoElement> ) => {
    setSecondsLeft(Math.round(evt.currentTarget.duration) - Math.round(evt.currentTarget.currentTime));
    if(progressRef.current && sliderRef.current) {
      sliderRef.current.style.left = `${progress}%`;
      progressRef.current.value = progress;
    }
    if (isNaN(evt.currentTarget.duration)) {
      return;
    }
    setProgress((evt.currentTarget.currentTime / evt.currentTarget.duration) * 100);
  };

  if(isFilmLoading || !film) {
    return <PreLoader />;
  }

  return (
    <div className="player">
      <video ref={videoRef} onProgress={handleProgress} src={film.videoLink} className="player__video" poster={film.previewImage} />

      <button onClick={handleExitPlayerClick} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress ref={progressRef} className="player__progress" value="0" max="100"></progress>
            <div ref={sliderRef} className="player__toggler" style={{left: '0'}}>Toggler</div>
          </div>
          <div className="player__time-value">-{sf.convert(secondsLeft).format()}</div>
        </div>

        <div className="player__controls-row">
          <button onClick={handlePlayVideoClick} type="button" className="player__play">
            {!isPlay ?
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>
              :
              <>
                <svg viewBox="0 0 14 21" width="19" height="19">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Puse</span>
              </>}
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;
