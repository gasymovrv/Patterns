package com.javapro.learn.kotlintest.examples

import org.apache.commons.codec.binary.Hex
import java.util.*

fun myUtil() {
    println("util func, call Java method:${JavaClass().method()}")
}

fun ifElse(arg: Int): String {
    if (arg == 1) {
        return "one"
    } else if (arg == 2) {
        return "two"
    }
    return when (arg) {
        3 -> "three"
        4 -> "four"
        5 -> "five"
        else -> "other"
    }
}

fun getNullableClass(str: String?): KotlinClass? {
    return if (str == null) {
        null
    } else {
        KotlinClass(str)
    }
}

fun encodeDecode() {
    val decodedHex0005 = Hex.decodeHex("0005")
    for(b in decodedHex0005) {
        print("$b ")
    }
    println()
    println(String(decodedHex0005))

    val decodedHex1520 = Hex.decodeHex("1520")
    for(b in decodedHex1520) {
        print("$b ")
    }
    println()
    println(String(decodedHex1520))
}

//AAUAAALBHl5BRGdvcFNx
fun getProductCode(code: String): String {

    val bytes = Base64.getDecoder().decode(code)
    println()
    val encodedString = Hex.encodeHexString(bytes)
    if (encodedString.isBlank() || encodedString.length < 4) {
        return encodedString
    }
    return encodedString.substring(0, 4)
}


fun main() {
    println(getProductCode("AAMgiSNZA1ZJ"))
}