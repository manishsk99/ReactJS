import {Container} from 'react-bootstrap';
import {useEffect} from 'react';
function About() {
    useEffect(() => {
        document.title = "About Us";
      }, []);
    return (
        <Container>
            <h1>About Us</h1>
            <p>   Voluptate culpa nisi pariatur laboris. Enim velit ex irure non laborum ullamco nulla nostrud. Magna cillum officia minim laborum qui irure. Duis ipsum magna magna labore et culpa.</p>

            <p>   Nulla do cupidatat excepteur sit et mollit aliqua ad aliqua tempor. Pariatur esse eu fugiat excepteur dolor amet. Officia adipisicing ipsum reprehenderit anim qui incididunt reprehenderit sint nostrud reprehenderit. Do tempor pariatur ipsum eu qui sunt commodo aute aute incididunt enim esse ea.</p>
            
            <p>Veniam veniam deserunt adipisicing minim sunt irure excepteur cillum velit Lorem. Excepteur Lorem labore duis tempor. Incididunt irure officia reprehenderit incididunt magna velit magna minim et enim in Lorem. Duis ea tempor ut consequat consequat laboris duis exercitation elit eu ea eu quis aliqua.</p>

            <p>    Esse dolor dolore irure voluptate. Voluptate nulla elit labore minim ex nostrud est. Occaecat exercitation exercitation consectetur ad laboris ea Lorem eiusmod. Consequat anim nisi laborum sunt culpa quis magna est incididunt duis nulla dolor. Occaecat amet ex ut exercitation aute fugiat quis. Commodo id in sint est ad.</p>

            <p>    Ipsum officia dolor commodo proident officia. Qui aliquip ut id ipsum esse labore id elit labore. Adipisicing dolor incididunt ex nostrud minim amet exercitation laboris do anim ipsum. Cillum magna culpa esse excepteur fugiat ipsum consectetur et exercitation culpa elit. Est excepteur sint non eiusmod qui nostrud magna tempor. Labore est commodo commodo ipsum reprehenderit eu dolor esse incididunt anim nulla veniam esse elit. Et et velit exercitation non nisi qui.</p>

            
        </Container>
    )
}

export default About;