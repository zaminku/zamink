import UseContext from '../Context'
import emailjs from '@emailjs/browser';
import { useContext, useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Mail from '../assets/mail.png'
import '../css/MailFolder.css'


function MailFolder() {

  const { 
    MailExpand, setMailExpand,
    setMybioExpand,
    setResumeExpand,
    setProjectExpand,
    setNftExpand,
    setNoteExpand,
    setTypeExpand,
    setWinampExpand,
    tap, setTap,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    setIconState,

   } = useContext(UseContext);

// ---------------------- EMAIL JS ---------------------------------------

const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3jp9sce', 'template_mwqeuol', form.current, {
        publicKey: 'VEMHa6EGtulAzDYSH',
      })
      .then(
        () => {
          alert('Thank you for your interest, will contact you back shortly!')
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

// ------------------------------------------------------------------------------

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMailExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setMailExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setMailExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

    function handleSetFocusItemTrue() { //click on one, other goes false
          setIconState(prevIcons => prevIcons.map(icon => ({
            ...icon,
            focus: false
        })));
        setMailExpand(prev => ({...prev, focusItem: true}))
        setMybioExpand(prev => ({...prev, focusItem: false}))
        setResumeExpand(prev => ({...prev, focusItem: false}))
        setProjectExpand(prev => ({...prev, focusItem: false}))
        setNoteExpand(prev => ({...prev, focusItem: false}))
        setNftExpand(prev => ({...prev, focusItem: false}))
        setTypeExpand(prev => ({...prev, focusItem: false}))
        setWinampExpand(prev => ({...prev, focus: false, focusItem: false}))
    }


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-mail'}
        grid={[1, 1]}
        scale={1}
        disabled={MailExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 50,
          y: window.innerWidth <= 500 ? 40 : 120,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={handleSetFocusItemTrue}
      >
        <div className='folder_folder-mail' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue();
            }}
            style={ MailExpand.expand ? 
            {
                display: MailExpand.show ? 'block' : '',
                maxWidth: 'none',
                width: '100%',
                height: 'calc(100% - 37px)',
                left: `${MailExpand.x <= 0 ? Math.abs(MailExpand.x)*2 + MailExpand.x : -MailExpand.x}px`,
                top: `${MailExpand.y <= 0 ? Math.abs(MailExpand.y)*2 + MailExpand.y : -MailExpand.y}px`,
                opacity: MailExpand.hide ? '0' : '1',
                zIndex: MailExpand.hide ? '-1' : (MailExpand.focusItem ? '999' : '3'),
                pointerEvents: MailExpand.hide ? 'none' : 'auto',
                resize: MailExpand.expand ? 'none' : '',
            } : { 
                display: MailExpand.show ? 'block' : '',
                opacity: MailExpand.hide ? '0' : '1',
                zIndex: MailExpand.hide ? '-1' : (MailExpand.focusItem ? '999' : '3'),
                pointerEvents: MailExpand.hide ? 'none' : 'auto'
                
            }
        }>
          <div className="folder_dragbar-mail"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: MailExpand.focusItem? '#14045c' : '#757579'}}
          >
            <div className="folder_barname-mail">
              <img src={Mail} alt="Mail" />
              <span>Mail</span>
            </div>
            <div className="folder_barbtn-mail">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setMailExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Mail') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setMailExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Mail')
                  }}
              >
                <p className='dash-mail'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-mail ${MailExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {MailExpand.expand ? 
                (
                <div className="expand_2-mail"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-mail'
                 onClick={!isTouchDevice ? () => {
                  setMailExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Mail')
                  setTap(newTap)
                 }: undefined
                }
                onTouchEnd={() => {
                  setMailExpand(prev => ({...prev, show: false, expand: false}));
                  const newTap = tap.filter(a => a !== 'Mail')
                  setTap(newTap)
              }}
              >x</p></div>
            </div>
          </div>

          <div className="file_edit_container-mail">
              <p>File<span style={{left: '-23px'}}>_</span></p>
              <p>Edit<span style={{left: '-24px'}}>_</span></p>
              <p>View<span style={{left: '-32px'}}>_</span></p>
              <p>Help<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content-mail"
            onClick={() => setMailExpand(prev => ({...prev, item_1Focus: false}))}
            style={MailExpand.expand ? 
              { height: 'calc(100svh - 122px)'} 
              : 
              {}
            }>

            {/* ------------------ EMAIL JS -------------------------- */}

            <form ref={form} onSubmit={sendEmail}>

              <div className="form_container">
                <div className="to_container">
                  <div className="to_icon">
                    <p>To...</p>
                  </div>
                  <input className="myemail_container" placeholder='yudthsoponvit@gmail.com' disabled />
                </div>
                <div className="to_container">
                  <div className="to_icon">
                    <p style={{fontSize: '12px'}}>Name</p>
                  </div>
                  <input className="myemail_container" type="text" name="from_name" required placeholder='your name' />
                </div>
                <div className="to_container">
                  <div className="to_icon" >
                    <p style={{fontSize: '12px'}}>Email</p>
                  </div>
                  <input className="myemail_container" type="email" name="from_email" required placeholder='your email' />
                </div>
              </div>
              <textarea name="message" required placeholder='Write here.....'
                style=
                {{
                  position: 'absolute',
                  width: '100%',
                  height: 'calc(100% - 90px )',
                  padding: '1rem 1rem',
                  fontSize: '14px',
                  border: '1px solid black',
                  borderBottomColor:'rgb(178, 177, 177)',
                  borderTopColor: 'rgb(178, 177, 177)',
                  resize: 'none',
                  borderRadius: '0px',
                  letterSpacing: '.5px',
                  background: '#ececec'
                }}
              />
              <div className="sendmail_icon">
              </div>
            </form>
          </div>
          
                <input className="sendmail_img_container" type="submit" value="Send" style={{textAlign: 'center'}} />

          
        </div>
      </Draggable>
    </>
  )
}          

export default MailFolder
