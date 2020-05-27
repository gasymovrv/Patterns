package com.javapro.learn.examples

import com.javapro.learn.examples.package1.getNullableClass
import com.javapro.learn.examples.package1.ifElse
import com.javapro.learn.examples.package1.myUtil

fun main() {
    func(1)
    func(1, arg3 = "sdfsrg", arg2 = 23)

    obj = "243"
    println(res)

    val frame = Frame()
    frame.width = 3000
    frame.height = 2000
    println(frame)
    println(frame.pixels)

    println(Vec(2f, 3f) + Vec(4f, 1f))

    for (i in 3 downTo 1) {
        println(i)
    }

    println("sdg sdgs hgfj jmuo, ry".format())
    try {
        print("secret".isBlankSecret())
    } catch (e: Throwable) {
    }
    println(Extensions().set("nsdlfk"))
    println("without suffix.txt".removeSuffix(".txt"))

    myUtil()

    println(StaticFieldsTest.companionField)
    println(StaticFieldsTest.companionFun("sdf"))

    val sum = { x: Int, y: Int -> x + y }
    println(sum(238, 139))
    println(ifElse(1))
    println(ifElse(4))
    println(ifElse(32))

    val items = setOf("apple", "banana", "kiwi", "orange")
    when {
        "orange" in items -> println("set contains orange")
        "apple" in items -> println("set contains apple")
    }

    println(mapOf(Pair("123", 100), Pair("123", 123), Pair("124", 124), Pair("125", 125)))

    println("get field from nullable object = ${getNullableClass(null)?.str?.length}")
    println("get field from nullable object = ${getNullableClass("str")?.str?.length}")
}

fun func(arg1: Int, arg2: Int = 0, arg3: String = "sdf") {
    println("$arg1, $arg2, $arg3")
}

var obj = "sdfs"
val res: Any = when {
    obj == null -> false
    obj is String && obj == "sdf" -> true
    else -> "not"
}

class Frame(width: Int = 1024, height: Int = 368) {
    private val ERROR_TEXT = " isn't correct, it should be between 0 and 4000"
    var width: Int = 800
        set(value) {
            if (value < 0 || value > 4000) {
                throw Throwable("value $value $ERROR_TEXT")
            }
            field = value
        }
    var height: Int = 600
        set(value) {
            if (value < 0 || value > 4000) {
                throw Throwable("value $value $ERROR_TEXT")
            }
            field = value
        }

    val pixels: Int
        get() = width * height

    override fun toString(): String {
        return "com.javapro.learn.examples.Frame(width=$width, height=$height)"
    }
}


data class Vec(val x: Float, val y: Float) {
    operator fun plus(v: Vec) = Vec(x + v.x, y + v.y)
}

fun String.format(): String = this.replace(' ', '_')

fun String.isBlankSecret(): Boolean {
    if (this == "secret") {
        throw Throwable()
    } else {
        return isBlank()
    }
}

data class Extensions(var field: String = "default")

fun Extensions.set(new: String): Extensions {
    this.field = new
    return this
}

class StaticFieldsTest {

    companion object {

        var companionField = "Hello static!"
        fun companionFun(value: String): String {
            return companionField + value
        }
    }

    object OneMoreObject {

        var value = 1
        fun function() {
        }
    }
}

