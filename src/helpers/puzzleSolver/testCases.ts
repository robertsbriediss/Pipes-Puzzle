/* eslint-disable max-len */

export {};

// const convertedMap = [
//     ['┗', '━', '━', '┫', '╹', '╻', '┓', '╹'],
//     ['╺', '┓', '╸', '┫', '╸', '┛', '╋', '┛'],
//     ['╹', '┫', '┓', '┓', '━', '┻', '━', '╺'],
//     ['╻', '┏', '┣', '┻', '━', '┛', '┛', '┳'],
//     ['╸', '┻', '┓', '┃', '╸', '╹', '━', '┫'],
//     ['┛', '╋', '┗', '┗', '╋', '┗', '╺', '┏'],
//     ['┏', '┗', '╸', '┏', '┻', '┓', '━', '┓'],
//     ['┛', '┃', '╺', '╻', '┏', '╸', '╺', '┓']
// ];

// const convertedMap = [
//     ['╸', '╸', '┏', '━', '┃', '┻', '┃', '┗'],
//     ['┳', '╋', '┻', '┗', '┏', '╻', '╹', '━'],
//     ['┃', '┃', '╹', '╻', '━', '╹', '┣', '┏'],
//     ['┃', '╻', '╸', '┗', '━', '┛', '┣', '╻'],
//     ['┓', '┃', '┫', '╋', '┫', '┫', '┓', '╻'],
//     ['┛', '━', '┓', '┃', '┏', '╋', '┣', '╸'],
//     ['┛', '┗', '┗', '┏', '╻', '┃', '┏', '╸'],
//     ['╹', '┏', '┏', '╻', '╸', '┫', '━', '╺']
// ];
// const convertedMap = [
//     ['╸', '┳', '┗'],
//     ['╹', '┏', '━'],
//     ['┛', '━', '┏'],
//     ['┓', '━', '╹'],
// ];

// const convertedMap = [
//     ['╸', '┳', '┗'],
//     ['╹', '━', '━'],
//     ['┃', '┫', '┏'],
//     ['┓', '┳', '╹'],
// ];
// [
//     ['╺', '┳', '┓'],
//     ['╻', '┃', '┃'],
//     ['┃', '┣', '┛'],
//     ['┗', '┻', '╸'],
// ];

// const convertedMap = [
//     ['╹', '┃', '┃', '┗'],
//     ['╹', '┃', '┃', '┻'],
//     ['╹', '┃', '┃', '┻'],
//     ['╹', '┃', '┃', '┗'],
// ];
// [
//     ['╺', '┳', '┓'],
//     ['╻', '┃', '┃'],
//     ['┃', '┣', '┛'],
//     ['┗', '┻', '╸'],
// ];

// const convertedMap = [
//     ['╸', '┫', '╺'],
//     ['┓', '┳', '┏'],
//     ['┓', '╻', '╻']
// ];

// const convertedMap = [
//     ['╸', '┗', '╺'],
//     ['┳', '┳', '╻'],
//     ['╻', '┓', '┏']
// ];

// const convertedMap = [
//     ['╸', '━', '┳', '┛', '╺', '┃', '┣', '━', '╸', '╹', '┫', '┏', '╺', '┃', '┳', '╻', '┛', '━', '╺', '╸', '┻', '┃', '┛', '┗', '┛'],
//     ['╺', '╻', '┃', '┗', '┣', '┃', '┳', '┛', '╸', '┓', '┏', '━', '┏', '╹', '┳', '╹', '┃', '┗', '┣', '┣', '┳', '╸', '┻', '┛', '╻'],
//     ['━', '┏', '┗', '╸', '━', '╹', '╹', '━', '━', '╻', '╻', '┣', '┣', '┏', '┣', '┗', '┗', '┳', '╺', '━', '╸', '┏', '━', '╻', '┛'],
//     ['┳', '━', '━', '┻', '┃', '┣', '┻', '┗', '┳', '┛', '╹', '╹', '┻', '┏', '╺', '┏', '╻', '┃', '┛', '┫', '╸', '┣', '┛', '┗', '┏'],
//     ['━', '╺', '━', '╋', '┫', '┃', '╸', '┓', '┓', '┛', '┻', '┣', '┃', '┗', '┃', '┃', '┳', '┣', '╻', '┗', '┗', '┃', '┏', '╋', '┛'],
//     ['╺', '╸', '╹', '┃', '┏', '┓', '╹', '╺', '┛', '┃', '┃', '┻', '┳', '┳', '╺', '╸', '╻', '┻', '╸', '╺', '┫', '┻', '╻', '╹', '┃'],
//     ['╸', '┣', '┣', '┗', '┓', '┓', '━', '┗', '┣', '━', '┃', '╻', '┏', '┏', '┏', '┫', '━', '┓', '┻', '┳', '┓', '┓', '━', '┫', '┓'],
//     ['━', '━', '╻', '╺', '┃', '╸', '┓', '┗', '┣', '╺', '╺', '╹', '╋', '┻', '┻', '╹', '┗', '┃', '┛', '┻', '┃', '╺', '╻', '┫', '╸'],
//     ['┏', '┫', '┫', '╋', '┗', '╹', '╹', '━', '╋', '━', '╋', '╺', '━', '╸', '┓', '╺', '╹', '╹', '┏', '┗', '╺', '╻', '┗', '╋', '╺'],
//     ['┛', '┓', '╹', '━', '╺', '┫', '┏', '╹', '━', '╸', '╸', '╸', '┫', '┻', '┣', '┓', '╺', '┻', '┻', '╸', '┣', '┓', '╸', '┓', '╹'],
//     ['┃', '┣', '┫', '┣', '┃', '╋', '╋', '┳', '┗', '┻', '┳', '┓', '╸', '┃', '┃', '┏', '┗', '┃', '╸', '┛', '━', '╺', '╋', '┃', '┛'],
//     ['╺', '┻', '╻', '╺', '┗', '┣', '╸', '┫', '╸', '┃', '┣', '╸', '╺', '╻', '╹', '╹', '╹', '┻', '╻', '┻', '┫', '┗', '┃', '┛', '┣'],
//     ['╺', '┫', '┛', '╋', '┫', '╹', '╸', '┳', '╺', '┗', '┃', '┛', '╋', '╸', '┗', '┻', '╸', '┳', '┗', '╺', '┏', '┳', '┳', '╺', '━'],
//     ['╸', '┫', '┃', '╸', '┻', '┃', '╻', '┣', '┃', '┫', '┫', '┗', '╹', '┓', '┻', '╹', '╺', '┃', '╋', '┫', '┣', '╸', '┏', '╺', '━'],
//     ['╻', '╸', '━', '╺', '┗', '┣', '┏', '╹', '╺', '┻', '┏', '╹', '┗', '╻', '━', '╺', '┗', '┃', '┛', '┓', '┫', '╋', '━', '╸', '━'],
//     ['┏', '┛', '┓', '┣', '┗', '┣', '┃', '╸', '┫', '┗', '┫', '━', '┻', '┻', '┳', '┗', '╻', '┗', '┻', '┻', '╻', '┃', '╸', '┓', '┛'],
//     ['┓', '┳', '╸', '━', '╻', '┃', '━', '╹', '┏', '┫', '╋', '╸', '╺', '╋', '━', '━', '╻', '╺', '┃', '╻', '━', '┻', '┓', '┃', '╸'],
//     ['┃', '╺', '┛', '┓', '┗', '┛', '┳', '┓', '╸', '┻', '╻', '╺', '┣', '┳', '┏', '┗', '┗', '┛', '┻', '┓', '╹', '╺', '╹', '┓', '┛'],
//     ['┏', '┃', '┫', '┃', '┫', '╺', '┳', '╹', '┗', '┫', '┗', '┓', '╋', '╹', '━', '╺', '┏', '┳', '┫', '┳', '┛', '┓', '┫', '━', '╹'],
//     ['╹', '┃', '┓', '╻', '┻', '╸', '┏', '╺', '┏', '╺', '╻', '╹', '╸', '╹', '┗', '╺', '━', '┗', '╺', '┗', '┣', '┃', '┻', '━', '╻']
// ];
