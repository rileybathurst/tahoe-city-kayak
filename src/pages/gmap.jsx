import * as React from "react"
import Header from '../components/header'
import Footer from '../components/footer'

function Map() {

  return (
<iframe 
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3093.1491304213137!2d-120.14318304818161!3d39.17133033825331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80997d75d2a1478b%3A0x29621f9373e52498!2sTahoe%20City%20Kayak%20and%20Paddleboard%20Retail!5e0!3m2!1sen!2sus!4v1679440735863!5m2!1sen!2sus" width="600" height="450" 
// style="border:0;" 
allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  )
}

const CurvePage = () => {

  return (
<>
<Header />
    <Map />
    <Footer />
</>

  )
}

export default CurvePage

