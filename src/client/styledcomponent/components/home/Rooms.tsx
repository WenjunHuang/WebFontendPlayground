// @flow
import * as React from 'react';
import Room from './Room'
import styled from 'styled-components'
import Title from '../globals/Title'
import Section from '../globals/Section'
import rooms from '../../rooms-data'
import {media, setColor, setRem} from "../../Styles"

type Props = {};
const Rooms = (props: Props) => {
    const [state, setState] = React.useState(() => rooms)
    return (
        <Section color={setColor.lightGrey}>
            <Title title="our rooms" center></Title>
            <RoomsCenter>
                {
                    state.map(item => {
                        return <Room key={item.id} room={item} />
                    })
                }
            </RoomsCenter>
        </Section>
    );
};

const RoomsCenter = styled.div`
  width: 90vw;
  margin: 0 auto;
  
  ${media.tablet`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${setRem(32)};
  `};
  
  ${media.desktop`
    width: 100vw;
    max-width: 1170px;
  `};
  ${media.large`
    grid-template-columns: repeat(3,1fr);
  `};
`

export default Rooms