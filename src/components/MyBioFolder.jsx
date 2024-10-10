import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import MyBio from '../assets/pc.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

   const technologyText = ( // don't have to use DangerousHTML
    <>
        I mainly use <span>JavaScript</span> and <span>React</span> 
        to create user-friendly interfaces, often incorporating <span>Tailwind</span> CSS for styling. 
        I've also developed full-stack projects with <span>Node.js</span>, 
        <span>Express</span>, <span>MongoDB</span> and 
        <span>MySQL</span> by bringing together the front end and back end 
        for seamless applications.
    </>
  );

  const bioText = ( // don't have to use DangerousHTML
    <>
        <strong>Objective:</strong>
        <br />
        <span>Building pixel perfect web </span>
        <span>application.</span>
        <br />
        <br />
        <strong>Information:</strong>
        <br />
        <span>Yute S. Lilitprapun</span>
        <br />
        <span>Front-end developer</span>
        <br />
        <span>929-235-5371</span>
        <br />
        <br />
        <strong>Location: </strong>
        <br />
        <span>New York City, Queens</span>
        <br />
        <span>Open to work</span>
        <br />
        <span>On Site / Remote</span>
    </>
  );

  const hobbyText = ( // don't have to use DangerousHTML
    <>
        In my free time, I love gaming with friends. 
        When I'm not at my computer, I make an effort 
        to hit the gym, discover new restaurants, 
        and go on adventures like hiking. 
        I played basketball in high school and would love to 
        get back into it!
    </>
  );

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }


  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('My Bio')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('My Bio');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('My Bio') : inlineStyle('My Bio')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={MyBio} alt="MyBio" />
              <span>My Bio</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('My Bio')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('My Bio')
              }}

              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('My Bio')
                    handleBiotap('general')
                  }: undefined}
                  onTouchEnd={() => {
                    deleteTap('My Bio')
                    handleBiotap('general')
                  }}
                >x
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio"
              style={{ display: generalTap ? 'grid' : 'block' }}
            >
            <img
              alt="bioPC"
              className={generalTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                {generalTap? bioText : technologyTap? technologyText : hobbyText}
              </p>   
            </div>
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('My Bio')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('My Bio')
                handleBiotap('general')
              }}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('My Bio')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('My Bio')
                handleBiotap('general')
              }}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
