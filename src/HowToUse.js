import { Container, Row } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import React from 'react';
import Highlight from 'react-highlight'
import postman from './icons/postman.png'
import Footer from './Footer';


function HowToUse() {
    
 
    
    return (
        <>
         
        <NavigationBar />
        <Container>

         

            <Row className='mt-5'>
                <h2 className='Poppins mt-3 mb-4 api-welcome'>How to use</h2>
                <p className='Poppins' style={{fontSize:'1.1rem'}}>For starter, the backend only accepts data in the form  of a <b>POST</b> method and, <b>FormData</b> Object, so you will need to create a FormData Object
                and Append your image to it, with the key being <b>img</b>. Bare in mind that this can be used using any programming language, but we recommend you do the API call from
                your front-end.</p>
                <h2 className='Poppins mt-3 mb-4 api-welcome'>Example in React</h2>
<br />
<Highlight language="javascript">
{`var URL = "https://52.208.80.193/image" `}
</Highlight>
<br />

<Highlight language="javascript" >
{`import axios from 'axios';
const [file, setFile] = useState(null);
function handleUpload(e) { 

e.preventDefault()
const fd = new FormData()
fd.append('img',file,file.name)
axios.post('https://52.208.80.193/image',fd)
.then(res => {
    /* 
    * handle incoming result from the server
    * update your state here
    * /
    })
    .catch(err => {
     read error message, sometimes the server might be down or you didn't comply with our doc */                 
    }
}
`}
</Highlight>
<br/>
<h2 className='Poppins mb-3 mt-3 api-welcome'>React JSX Code:</h2>
<Highlight language='xml'>
{`<div>
    <input type='file' name='img' onchange="handleChange">
    <button type='submit' onclick="handleUpload">Predict</button>
</div>
`}
</Highlight>
            </Row>


            <Row>
                <h2 className='Poppins mb-3 mt-3 api-welcome'>The Result Will be Like This:</h2>
                <Highlight className='json'>
{`{
"description": "Early blight of potato is a common disease found in most potato growing regions. The disease is caused by the fungus Alternaria solani, which can also afflict tomatoes and other members of the potato family. Potatoes become infected with early blight when foliage has become excessively wet due to rain, fog, dew, or irrigation. Although not a terminal disease, severe infections can be fairly detrimental. In contrast to its name, early blight rarely develops early; it actually usually affects mature foliage rather than young, tender leaves.",
"disease": "Early blight",
"plant_name": "Potato",
"probability": "0.6713843",
"treatment": "The spores and mycelia of the pathogen survive in infested plant debris and soil, in infected tubers and in overwintering host crops and weeds. Spores are produced when temperatures are between 41 and 86 degrees F. (5-30 C.) with alternating periods of wetness and dryness. These spores are then spread through wind, splashing rain, and irrigation water. They gain entry via wounds caused by mechanical injury or insect feeding. Lesions begin to appear two or three days after the initial infection. Treatment of early blight includes prevention by planting potato varieties that are resistant to the disease; late maturing ones are more resistant than early maturing varieties. Avoid overhead irrigation and allow for sufficient aeration between plants to allow the foliage to dry as quickly as possible. Practice a two year crop rotation. That is, do not replant potatoes or other crops in this family for two years after a potato crop has been harvested."
}`}
                </Highlight>

            </Row>

            <Row>
                <h2 className='Poppins mb-3 mt-3 api-welcome'>Example Using Postman</h2>
                <br />
                <img src={postman} alt='postman-example' style={{maxWidth:'100%!important',height:'auto'}} />
                
            </Row>

            <Row>
            <p className='Poppins mt-3 mb-5' style={{fontSize:'1.1rem'}}>
                If you still get errors or face difficulties, you can always contact us at <a href='https://www.twitter.com/fahad_alaraik'  rel="noreferrer" target="_blank">Twitter</a>.
            </p>
            </Row>
        </Container>
        <Footer />
        </>    
    );
}

export default HowToUse;