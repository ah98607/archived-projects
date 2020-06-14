import React from "react";
const name = "Andy";
const age = () => 26;
const reversedName = (s) => {
    let newS = "";
    for (let i = 0; i < s.length; i++) {
        newS += s.charAt(s.length - 1 - i);
    }
    return newS;
}
const HelloDiv = () => (
    <div>
        <h1>Name: {name}</h1>
        <h1>Age: {age()}</h1>
        <h1>Reversed Name: {reversedName(name)}</h1>
        <ul>
            <li>Web Development</li>
            <li>Basketball</li>
            <li>Travelling</li>
        </ul>
    </div>
);

export default HelloDiv;
