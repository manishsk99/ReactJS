import { Carousel } from 'react-bootstrap';

function AppCarousel(props) {

  return (
    <>
      <Carousel className="mt-0">
      {
        props.bannerList.map((item, key) =>
          <Carousel.Item key={key}>
            <img
              className="d-block w-100"
              src={item.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }
    </Carousel>
    </>
  )
}

export default AppCarousel;