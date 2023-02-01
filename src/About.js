import React from 'react';
import NavigationBar from './NavigationBar';
import { Container } from 'react-bootstrap';
import aboutImage from './icons/about-plant.png';
import Carousel from 'react-bootstrap/Carousel';
import fahad from './icons/fahad.jpeg';
import nawaf from './icons/nawaf.jpeg';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import Footer from './Footer';

function About(props) {

    return (
        <>
        <NavigationBar />
        <Container style={{marginTop:'65px',padding:'65px 35px 35px 35px',background:'rgb(237 239 243 / 68%)',borderRadius:'35px'}}>
            <div className='m-auto text-center'>
                <img className='  text-center mb-4' src={aboutImage} style={{width:'156px',height:'156px'}} />
                <br />
                <h1 className=' d-inline mb-3' style={{fontWeight:'lighter',fontSize:'3.5em',color: '#3d4460'}}>About Nabtah</h1>
            </div>
            
            
            <p className='mb-3' style={{textAlign:'justify',marginTop:'50px',fontSize:'1.25rem'}}>Nabtah is a plant disease detection that uses machine learning algorithm to identify plant diseases and suggest treatment for them. The model is powered using VGG-19, 
            VGG-19 is a convolutional neural network that is 19 layers deep, trained on a <a href='https://paperswithcode.com/dataset/plantvillage' target="_blank" style={{textDecoration:'None'}}>plant diseases dataset</a>.
            Nabtah is our bachelor degree graduation project requirement for King Saud University. All of the treatment suggested are taken from <a href='https://www.gardeningknowhow.com/' target='_blank' style={{textDecoration:'None'}}>Gardening Know How
            </a> is a website that aims to help people grow their gardens, it offers a variety of information regarding plant's and their diseases, as well as suggests treatments for them. </p>
            
            <h1 className='mb-5' style={{fontWeight:'lighter',fontSize:'3.5em',color: '#3d4460',marginTop:'105px',textAlign:'center'}}>Meet The Team</h1>
            <Carousel variant="dark" interval={null}>
                <Carousel.Item >
                    <img
                    className="d-block m-auto"
                    src={fahad}
                    alt="First slide"
                    style={{width:'256px',height:'256px',borderRadius:'75px'}}
                    />
                 <Carousel.Caption className='m-3 text-center' style={{position:'static'}}>
                    <h2 className='mb-3' style={{fontWeight:'lighter'}} >Fahad Abdullah Al-Araik</h2>
                    <p className='Poppins mb-3 mt-2' style={{color: '#3d4460',fontWeight:'bold'}}>Project Leader, Software Engineer, Full-Stack Developer</p>
                    <p> <a href='https://www.linkedin.com/in/fahad-al-araik-6a3676225/' className='p-2 about-icon'><BsLinkedin style={{height:'24px',width:'24px'}}/></a> 
                        <a href='https://twitter.com/fahad_alaraik' className='p-2 about-icon'><BsTwitter style={{height:'24px',width:'24px'}}/></a>
                     </p>
                    </Carousel.Caption>

                </Carousel.Item>

                {/* */}

                <Carousel.Item>
                    <img
                    className="d-block m-auto"
                    src={nawaf}
                    alt="First slide"
                    style={{width:'256px',height:'256px',borderRadius:'75px'}}
                    />
                 <Carousel.Caption className='m-3 text-center' style={{position:'static'}}>
                 <h2 className='mb-3' style={{fontWeight:'lighter'}} >Nawaf Saud Al-Subaie</h2>
                 <p className='Poppins mb-3 mt-2' style={{color: '#3d4460',fontWeight:'bold'}}>Software Engineer, Front-End Developer</p>
                <p> <a href='https://www.linkedin.com/in/nawafsubaie/' className='p-2 about-icon'><BsLinkedin style={{height:'24px',width:'24px'}}/></a> 
                    <a href='https://twitter.com/Nawafsuu' className='p-2 about-icon'><BsTwitter style={{height:'24px',width:'24px'}}/></a>
                </p>
                    </Carousel.Caption>

                </Carousel.Item>
               
            </Carousel>
            <h1  style={{marginTop:'105px',fontWeight:'lighter',fontSize:'3.5em',color: '#3d4460',textAlign:'center'}}>Vision</h1>
            <p className='mb-3' style={{textAlign:'justify',marginTop:'50px',fontSize:'1.25rem'}}>Our vision is to make Nabtah a large agriculture platform that can gather data from farmers or gardeners
            and help them detect their crops diseases or even raise awarness of a new surfaced disease through out Saudi Arabia. We plan to collect more data about more diseases and add them to
            our machine learning model to make it more comprehensive for all plants. Currently our model does not support all plants, since we lack the data (images) for them.</p>

        </Container>
        <br />
        <Footer />
        
        </>
    );
}

export default About;