import * as React from 'react'
import Hero from '../globals/Hero'
import aboutImg from '../../images/aboutBcg.jpeg'
import homeImg from '../../images/homeBcg.jpeg'
import Banner from "../globals/Banner"
import {PrimaryBtn} from "../globals/Buttons"

const Header = () => {
    return (
        <Hero img={homeImg}>
            <Banner greeting="welcome to" title="beachwalk" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate suscipit ipsum, tincidunt interdum urna euismod ut.">
                <PrimaryBtn t="1rem">
                    View Details
                </PrimaryBtn>
                {/*<PrimaryBtn as="a" href="https://www.google.com">*/}
                {/*    View Details*/}
                {/*</PrimaryBtn>*/}
            </Banner>
        </Hero>
    )
}
export default Header
