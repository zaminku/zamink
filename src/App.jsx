import { useState, useEffect, useRef } from 'react'
import UserContext from './Context'
import Footer from './components/Footer';
import Dragdrop from './components/Dragdrop';
import MyBioFolder from './components/MyBioFolder';
import ResumeFolder from './components/ResumeFolder';
import ProjectFolder from './components/ProjectFolder';
import MailFolder from './components/MailFolder';
import NftFolder from './components/NftFolder';
import NoteFolder from './components/NoteFolder';
import TypeFolder from './components/TypeFolder';
import ResumeFile from './components/ResumeFile';
import iconInfo from './icon.json'
import { StyleHide, imageMapping, 
  handleDoubleClickEnterLink,
  handleDoubleTapEnterMobile } from './components/function/AppFunctions';

function App() {
  const ClearTOdonttouch = useRef(null);
  const ClearTOSongfunction = useRef(null);
  const ClearTOclippySendemailfunction = useRef(null);
  const ClearTOclippyThanksYouFunction = useRef(null);
  const firstTimoutShowclippy = useRef(null);
  const RandomTimeoutShowClippy = useRef(null);
  const SecondRandomTimeoutShowClippy = useRef(null);
  const [clippySong, setClippySong] = useState(false)
  const [clippySendemail, setClippySendemail] = useState(false)
  const [clippyThanks, setClippyThanks] = useState(false)
  const [clippyTouched, setClippyTouched] = useState(false)
  const [randomClippyPopup, setRandomClippyPopup] = useState(false)
  const [clippyIndex, setClippyIndex] = useState(0)
  const [showClippy, setShowClippy] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [startActive, setStartActive] = useState(false);
  const [time, setTime] = useState('');
  const [tap, setTap] = useState([])
  const [lastTapTime, setLastTapTime] = useState(0)
  const [MybioExpand, setMybioExpand] = useState(
  {
    expand: false, // fullscreen
    show: false, // show folder when double clicked
    hide: false, // hide folder to the tap
    focusItem: true, // devide if item is being clicked on or not
    x: 0, y: 0, // position before fullscreen
  });
  const [ResumeExpand, setResumeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0, item_1Focus: false});

  const [ProjectExpand, setProjectExpand] = useState(
  {
    expand: false, show: false, hide: false, focusItem: true, 
    x: 0, y: 0, item_1Focus: false, item_2Focus: false, 
    item_3Focus: false, 
  });
  
  const [MailExpand, setMailExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [NftExpand, setNftExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [NoteExpand, setNoteExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [TypeExpand, setTypeExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});

  const [WinampExpand, setWinampExpand] = useState(
  {focus: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});
  
  const [ResumeFileExpand, setResumeFileExpand] = useState(
  {expand: false, show: false, hide: false, focusItem: true, x: 0, y: 0,});
  
  const [iconState, setIconState] = useState(() =>
  iconInfo.map(icon => ({
    ...icon,
    focus: false, // blue bg on icon
  }))
);

function handleShow(name) {
      
  switch (name) {
      case 'My Bio': 
          setMybioExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          if (tap.includes('My Bio')) {
            setMybioExpand(prev => ({...prev, hide: false}))
            return;
          }
          setTap(prevTap => [...prevTap, 'My Bio']); // put bio in []
          setIconState(prevIcons => prevIcons.map(icon => ({ // unhighlight icon
              ...icon,
              focus: false
          })));
          break;

      case 'Resume': 
          setResumeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          if(tap.includes('Resume')) return;
          setTap(prevTap => [...prevTap, 'Resume']);
          setIconState(prevIcons => prevIcons.map(icon => ({
              ...icon,
              focus: false
          })));
          break;

      case 'Project': 
          setProjectExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          if(tap.includes('Project')) return;
          setTap(prevTap => [...prevTap, 'Project'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        break;

      case 'Mail': 
          setMailExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
          clippySendemailfunction()
          if(tap.includes('Mail')) return;
          setTap(prevTap => [...prevTap, 'Mail'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        break;

      case 'Nft': 
          setNftExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Nft')) return;
          setTap(prevTap => [...prevTap, 'Nft'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        break;

      case 'Note': 
          setNoteExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Note')) return;
          setTap(prevTap => [...prevTap, 'Note'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
      })));
      break;

      case 'Type': 
          setTypeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setWinampExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Type')) return;
          setTap(prevTap => [...prevTap, 'Type'])
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
      })));
      break;

      case 'Winamp': 
      if (WinampExpand.hide) {
        const webampElement = document.querySelector('#webamp');
        if (webampElement) {
            webampElement.style.opacity = 1;
            webampElement.style.pointerEvents = 'auto';
            webampElement.style.touchAction = 'auto'
            setWinampExpand(prev => ({...prev, hide: false}));
        }
    }     clippySongFunction() // call clippy function to show
          setWinampExpand(prev => ({...prev, show: true, focusItem: true, focus: false}));
          setResumeExpand(prev => ({...prev, focusItem: false}));
          setMybioExpand(prev => ({...prev, focusItem: false}));
          setProjectExpand(prev => ({...prev, focusItem: false}));
          setNftExpand(prev => ({...prev, focusItem: false}));
          setNoteExpand(prev => ({...prev, focusItem: false}));
          setMailExpand(prev => ({...prev, focusItem: false}));
          setTypeExpand(prev => ({...prev, focusItem: false}));
          setResumeFileExpand(prev => ({...prev, focusItem: false}));
      if(tap.includes('Winamp')) return;
          setTap(prevTap => [...prevTap, 'Winamp'])
          setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'ResumeFile': 
        setResumeFileExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('ResumeFile')) return;
        setTap(prevTap => [...prevTap, 'ResumeFile'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

  }
}

function handleShowMobile(name) {
const now = Date.now()
if (now - lastTapTime < 300) {
  switch (name) {
    case 'My Bio': 
      setMybioExpand(prev => ({...prev, show: true, focusItem: true, hide: false})); 
      setResumeExpand(prev => ({...prev, focusItem: false})); 
      setProjectExpand(prev => ({...prev, focusItem: false}));
      setMailExpand(prev => ({...prev, focusItem: false}));
      setNftExpand(prev => ({...prev, focusItem: false}));
      setNoteExpand(prev => ({...prev, focusItem: false}));
      setTypeExpand(prev => ({...prev, focusItem: false}));
      setWinampExpand(prev => ({...prev, focusItem: false}));
      setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('My Bio')) return;
      setTap(prevTap => [...prevTap, 'My Bio'])
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
    })));
    break;

    case 'Resume': 
      setResumeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
      setMybioExpand(prev => ({...prev, focusItem: false}));
      setProjectExpand(prev => ({...prev, focusItem: false}));
      setMailExpand(prev => ({...prev, focusItem: false}));
      setNftExpand(prev => ({...prev, focusItem: false}));
      setNoteExpand(prev => ({...prev, focusItem: false}));
      setTypeExpand(prev => ({...prev, focusItem: false}));
      setWinampExpand(prev => ({...prev, focusItem: false}));
      setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Resume')) return;
      setTap(prevTap => [...prevTap, 'Resume'])
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
    })));
    break;

    case 'Project': 
      setProjectExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
      setResumeExpand(prev => ({...prev, focusItem: false}));
      setMybioExpand(prev => ({...prev, focusItem: false}));
      setMailExpand(prev => ({...prev, focusItem: false}));
      setNftExpand(prev => ({...prev, focusItem: false}));
      setNoteExpand(prev => ({...prev, focusItem: false}));
      setTypeExpand(prev => ({...prev, focusItem: false}));
      setWinampExpand(prev => ({...prev, focusItem: false}));
      setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Project')) return;
      setTap(prevTap => [...prevTap, 'Project'])
      setIconState(prevIcons => prevIcons.map(icon => ({
        ...icon,
        focus: false
    })));
    break;

    case 'Mail': 
        setMailExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
        clippySendemailfunction()
    if(tap.includes('Mail')) return;
        setTap(prevTap => [...prevTap, 'Mail'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Nft': 
        setNftExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Nft')) return;
        setTap(prevTap => [...prevTap, 'Nft'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Note': 
        setNoteExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Note')) return;
        setTap(prevTap => [...prevTap, 'Note'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Type': 
        setTypeExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Type')) return;
        setTap(prevTap => [...prevTap, 'Type'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'Winamp': 
    if (WinampExpand.hide) {
      const webampElement = document.querySelector('#webamp');
      if (webampElement) {
          webampElement.style.opacity = 1;
          webampElement.style.pointerEvents = 'auto';
          webampElement.style.touchAction = 'auto'
          setWinampExpand(prev => ({...prev, hide: false}));
      }
  }     
        clippySongFunction() // call clippy function to show
        setWinampExpand(prev => ({...prev, show: true, focusItem: true, focus: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
        setResumeFileExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('Winamp')) return;
        setTap(prevTap => [...prevTap, 'Winamp'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    case 'ResumeFile': 
        setResumeFileExpand(prev => ({...prev, show: true, focusItem: true, hide: false}));
        setResumeExpand(prev => ({...prev, focusItem: false}));
        setMybioExpand(prev => ({...prev, focusItem: false}));
        setProjectExpand(prev => ({...prev, focusItem: false}));
        setNftExpand(prev => ({...prev, focusItem: false}));
        setNoteExpand(prev => ({...prev, focusItem: false}));
        setMailExpand(prev => ({...prev, focusItem: false}));
        setWinampExpand(prev => ({...prev, focusItem: false}));
        setTypeExpand(prev => ({...prev, focusItem: false}));
    if(tap.includes('ResumeFile')) return;
        setTap(prevTap => [...prevTap, 'ResumeFile'])
        setIconState(prevIcons => prevIcons.map(icon => ({
          ...icon,
          focus: false
    })));
    break;

    }
}  
setLastTapTime(now)
}


    useEffect(() => { // open Bio Folder when app starts
      handleShow('My Bio')
    },[])

    useEffect(() => { // touch support device === true
      const onTouchStartSupported = 'ontouchstart' in document.documentElement;
      setIsTouchDevice(onTouchStartSupported);
    }, []);

    useEffect(() => { // hitting windows button activates start menu
      const handleKeyPress = (event) => {
          if (event.keyCode === 91 || event.keyCode === 92 || event.keyCode === 93) {
              setStartActive(prev => !prev)
          }
      };
      document.addEventListener('keydown', handleKeyPress);
      return () => {
          document.removeEventListener('keydown', handleKeyPress);
      };
  }, []);


  function handleClippyFunction(setterFunction, clearFunction, allSetters) {
    // Clear all existing timeouts
    allSetters.forEach((setter, index) => {
      if (setter !== setterFunction) {
        setter(false);
        clearTimeout(allClears[index].current);
      }
    });
    setterFunction(true);
    setShowClippy(true);
    
    clearTimeout(clearFunction.current);
    if (RandomTimeoutShowClippy.current) clearTimeout(RandomTimeoutShowClippy.current);
    if (firstTimoutShowclippy.current) clearTimeout(firstTimoutShowclippy.current);
    if (SecondRandomTimeoutShowClippy.current) clearTimeout(SecondRandomTimeoutShowClippy.current);
    
    clearFunction.current = setTimeout(() => {
      setterFunction(false);
      setShowClippy(false);
      setRandomClippyPopup(prev => !prev);
    }, 8000);
  }
  
  // Define all state setter functions and corresponding clear functions in an array
  const allSetters = [setClippyThanks, setClippySendemail, setClippySong];
  const allClears = [ClearTOclippyThanksYouFunction, ClearTOclippySendemailfunction, ClearTOSongfunction];
  
  function clippyThanksYouFunction() {
    handleClippyFunction(setClippyThanks, ClearTOclippyThanksYouFunction, allSetters);
  }
  
  function clippySendemailfunction() {
    handleClippyFunction(setClippySendemail, ClearTOclippySendemailfunction, allSetters);
  }
  
  function clippySongFunction() {
    handleClippyFunction(setClippySong, ClearTOSongfunction, allSetters);
  }

  useEffect(() => { // prevent zooming on mobile
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
  });
  },[])
  

  
 

  const contextValue = {
    startActive, setStartActive,
    time, setTime,
    iconState, setIconState,
    MybioExpand, setMybioExpand,
    tap, setTap,
    imageMapping,
    lastTapTime, setLastTapTime,
    ResumeExpand, setResumeExpand,
    handleShow, handleShowMobile,
    StyleHide,
    isTouchDevice, setIsTouchDevice,
    ProjectExpand, setProjectExpand,
    MailExpand, setMailExpand,
    NftExpand, setNftExpand,
    NoteExpand, setNoteExpand,
    TypeExpand, setTypeExpand,
    handleDoubleTapEnterMobile,
    handleDoubleClickEnterLink,
    WinampExpand, setWinampExpand,
    showClippy, setShowClippy,
    clippyIndex, setClippyIndex,
    randomClippyPopup, setRandomClippyPopup,
    clippyTouched, setClippyTouched,
    clippyThanks, setClippyThanks,
    clippySendemail, setClippySendemail,
    clippyThanksYouFunction,
    clippySendemailfunction,
    RandomTimeoutShowClippy, 
    firstTimoutShowclippy,
    SecondRandomTimeoutShowClippy,
    ClearTOclippySendemailfunction,
    ClearTOclippyThanksYouFunction,
    ResumeFileExpand, setResumeFileExpand,
    clippySong, setClippySong,
    clippySongFunction,
    ClearTOSongfunction,
    ClearTOdonttouch,
  }

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <MyBioFolder/>
        <ResumeFolder/>
        <ProjectFolder/>
        <MailFolder/>
        <NftFolder/>
        <NoteFolder/>
        <TypeFolder/>
        <ResumeFile/>
        <Dragdrop/>
        <Footer/>
      </UserContext.Provider>
    </>
  )
}

export default App
