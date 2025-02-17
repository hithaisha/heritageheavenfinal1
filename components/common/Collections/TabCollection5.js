import React, { Fragment, useState, useContext } from 'react'
import { Container, Row, Col, Media } from 'reactstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import PostLoader from '../PostLoader'
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext'

const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        stock
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`

const TabContent = ({ data, loading, startIndex, endIndex }) => {
  const curContext = useContext(CurrencyContext)
  const currency = curContext.state
  return (
    <>
      {!data || !data.products || !data.products.items || loading ? (
        <div className="row mx-0 margin-default">
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
        </div>
      ) : (
        <Row className="product-tab">
          {data &&
            data.products.items.slice(startIndex, endIndex).map((item, i) => (
              <div className="tab-box" key={i}>
                <div className="product-box2">
                  <div className="media">
                    <a href={null}>
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={item?.itemImageUrl}
                        alt=""
                      />
                    </a>
                    <div className="media-body align-self-center">
                      <div className="rating">
                        <i className="fa fa-star"></i>{' '}
                        <i className="fa fa-star"></i>{' '}
                        <i className="fa fa-star"></i>{' '}
                        <i className="fa fa-star"></i>{' '}
                        <i className="fa fa-star"></i>
                      </div>
                      <a href={null}>
                        <h6>{item.title}</h6>
                      </a>
                      <h4>
                        {currency.symbol}
                        {((item.price / 100) * currency.value).toFixed(2)}
                        <del>
                          <span className="money">
                            {currency.symbol}
                            {(item.price * currency.value).toFixed(2)}
                          </span>
                        </del>
                      </h4>
                      <ul className="color-variant">
                        <li className="bg-light0"></li>
                        <li className="bg-light1"></li>
                        <li className="bg-light2"></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Row>
      )}
    </>
  )
}

const TabProducts = ({ type }) => {
  const [activeTab, setActiveTab] = useState(type)
  const curContext = useContext(CurrencyContext)
  const currency = curContext.state

  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: activeTab,
      indexFrom: 0,
      limit: 17,
    },
  })

  return (
    <Fragment>
      <section className="p-0">
        <div className="tab-bg">
          <Container fluid={true}>
            <Row>
              <Col>
                <div className="title4">
                  <h2 className="title-inner4">trending products</h2>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <Tabs className="theme-tab">
                  <TabList className="tabs tab-title">
                    <Tab
                      className={activeTab == type ? 'active' : ''}
                      onClick={() => setActiveTab(type)}
                    >
                      unisex watches
                    </Tab>
                    <Tab
                      className={activeTab == 'couple' ? 'active' : ''}
                      onClick={() => setActiveTab(type)}
                    >
                      couple watches
                    </Tab>
                    <Tab
                      className={activeTab == 'titanium' ? 'active' : ''}
                      onClick={() => setActiveTab(type)}
                    >
                      titanium watches
                    </Tab>
                    <Tab
                      className={activeTab == 'gold' ? 'active' : ''}
                      onClick={() => setActiveTab(type)}
                    >
                      gold watches
                    </Tab>
                  </TabList>
                  <div className="tab-content-cls">
                    <TabPanel className="tab-content active default">
                      <TabContent
                        data={data}
                        loading={loading}
                        startIndex={0}
                        endIndex={8}
                      />
                    </TabPanel>
                    <TabPanel className="tab-content">
                      <TabContent
                        data={data}
                        loading={loading}
                        startIndex={4}
                        endIndex={12}
                      />
                    </TabPanel>
                    <TabPanel className="tab-content">
                      <TabContent
                        data={data}
                        loading={loading}
                        startIndex={0}
                        endIndex={8}
                      />
                    </TabPanel>
                    <TabPanel className="tab-content">
                      <TabContent
                        data={data}
                        loading={loading}
                        startIndex={4}
                        endIndex={12}
                      />
                    </TabPanel>
                  </div>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Fragment>
  )
}

export default TabProducts
