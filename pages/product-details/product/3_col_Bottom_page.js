import React, { useContext, useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Media } from 'reactstrap'
import Slider from 'react-slick'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import ImageZoom from '../common/image-zoom'
import DetailBox from '../common/detail-box'
import Detail from '../common/detailPage'
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext'

const GET_SINGLE_PRODUCTS = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        color
        image_id
        variant_id
        size
      }
      images {
        image_id
        src
      }
    }
  }
`

const ThreeColRightPage = () => {
  const curContext = useContext(CurrencyContext)
  const symbol = curContext.state.symbol
  const [state, setState] = useState({ nav1: null, nav2: null })
  const slider1 = useRef()
  const slider2 = useRef()
  var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: 1,
    },
  })
  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  }
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  }

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    })
  }, [data])

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id)
  }

  const { nav1, nav2 } = state

  return (
    <section>
      <div className="collection-wrapper">
        <Container>
          {!data || !data.product || data.product.length === 0 || loading ? (
            ''
          ) : (
            <Row className="leftImage">
              <Col lg="4">
                <Row>
                  <Col>
                    <Slider
                      {...products}
                      asNavFor={nav2}
                      ref={(slider) => (slider1.current = slider)}
                      className="product-right-slick"
                    >
                      {data.product.variants
                        ? data.product.images.map((vari, index) => (
                            <div key={index}>
                              <ImageZoom image={vari} />
                            </div>
                          ))
                        : data.product.images.map((vari, index) => (
                            <div key={index}>
                              <ImageZoom image={vari} />
                            </div>
                          ))}
                    </Slider>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12" className="">
                    <Slider
                      className="slider-nav"
                      {...productsnav}
                      asNavFor={nav1}
                      ref={(slider) => (slider2.current = slider)}
                    >
                      {data.product.variants
                        ? data.product.images.map((vari, index) => (
                            <div key={index}>
                              <Media
                                src={`${vari.src}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid"
                              />
                            </div>
                          ))
                        : ''}
                    </Slider>
                  </Col>
                </Row>
              </Col>
              <Col lg="4">
                <Detail item={data.product} />
              </Col>
              <Col lg="4">
                <DetailBox
                  symbol={symbol}
                  item={data.product}
                  changeColorVar={changeColorVar}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </section>
  )
}

export default ThreeColRightPage
