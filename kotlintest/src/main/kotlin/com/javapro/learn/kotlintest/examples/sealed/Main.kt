package com.javapro.learn.kotlintest.examples.sealed

fun main() {
    println(eval(Expr.Const(235.1)))
    println(eval(Expr.Sum(235.1, 5687.3)))
    println(eval(Expr.NotNumber))
}

fun eval(expr: Expr): Double = when(expr) {
    is Expr.Const -> expr.num
    is Expr.Sum -> expr.a1 + expr.a2
    Expr.NotNumber -> Double.NaN
}