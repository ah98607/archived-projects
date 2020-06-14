import React from "react";
import {Navbar, NavItem, Row, Col, Input, Carousel} from 'react-materialize';
const SavedNews = props => 
    <div>
        <div>
            Title: {props.articleTitle}
        </div>
        <div>
            Link: <em><a href={props.articleLink}>{props.articleLink}</a></em>
        </div>
    </div>
export default SavedNews;