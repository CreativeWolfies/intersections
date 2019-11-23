# Intersections

This is a test repository to find out which method for calculating segment intersection works best.
The task which was given was to write a function which would tell wether or not two segments intersect.

This repository currently contains 2 methods, `scalar-projection` and `matrix-inversion`.
If you have another method, feel free to add yours and open a pull request!

## Methods

These are put as singular files in the `methods/` folder.

A function `edge_cases(A, B, C, D)` is available.
It handles cases where one or both of the segments are of length 0, return `true` or `false` if any of these happen and `null` otherwise.

Methods are called with four arguments, `A, B, C, D`. Each of them is an array with two numbers, representing the coordinates of that point.

Methods should return true or false based on wether or not `[AB]` and `[CD]` intersect.

## [Try it out!](https://creativewolfies.github.io/intersections/index.html)
