import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function CollectionGameCard (props) {
    const { id, imgSrc, title, description } = props;


    return (
        <Card className='gameCard d-flex justify-content-between bg-dark text-white' key={id}>
        <Card.Img src={imgSrc} variant='top' style={{ width:'100%', height: '180px', objectFit: 'cover' }}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>Metacritic Rating: {description}</Card.Text>
            <Link to={`/details/${id}`}>
            <Button className='cardbutton mx-2' variant="outline-light">Details</Button>
            </Link>
        </Card.Body>
         </Card>
    )
    }

