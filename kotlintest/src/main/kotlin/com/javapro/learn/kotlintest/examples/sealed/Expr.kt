package com.javapro.learn.kotlintest.examples.sealed

sealed class Expr {
    class Const(val num: Double) : Expr()
    class Sum(val a1: Double, val a2: Double) : Expr()
    object NotNumber : Expr()
}