package com.javapro.learn.kotlintest.examples.receipts.utils

import com.nimbusds.jose.JWSAlgorithm
import com.nimbusds.jose.JWSHeader
import com.nimbusds.jose.JWSObject
import com.nimbusds.jose.Payload
import com.nimbusds.jose.crypto.RSASSASigner
import com.nimbusds.jwt.JWTClaimsSet
import java.security.KeyFactory
import java.security.KeyPair
import java.security.KeyPairGenerator
import java.security.PrivateKey
import java.security.spec.PKCS8EncodedKeySpec
import java.security.spec.X509EncodedKeySpec
import java.time.Instant
import java.util.Base64

const val privateKey = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCVf3cWzZNEIDeVM9QpQpJmsaJaQBSnKo+iS4e2GEhG/bVSuRMd9/gkOb++A9EilPMns70zC26hmlrR7XkFa45N09RcWGRcBqAc8cV+HYiFIESgKnP28s3OvrZiFnc2CdzRjzZmeieoIa+IO72hbRI3HVnNppUpI0LHziDjcHqB4sinaf0i7YFC0gFtjAOueLZOEfpD1XUlwmdbsZ1UQMozK9Ft7qXLdhakegE+VOiYC5jtbkCgGl/BgTpgUWJaMI6a6bEa8LwoglFhS8oE/y5cK2p510NazD01wUjkXU6bCtGePEEysIwmXqujdOvIqH7cA1mVwaHyF45m9VqYB9CLAgMBAAECggEAcnSPOW8Ug4Di7SEsGpa0PVlcQhpzdXR5WTjYYwp+M5PEQdweDcCuQxXPfeuwLvi4nLnYbX8gKStiwvw7vnGVFnLKUBUAaRBNfzt/B0oXHk0RHUrDU9qaxOFwAvLOPBoa7HnnnVeCiw+XMwcB7NfzrSyUd4VFB6TOWOiwd1DDCjLpqYwUrD4+CYlRcxemMt6nYoaA6PMF5WEv4OgkmDcnbc2IZ8V4l66lwYGr50DrSAJJgZEisDaW2Ag5MchozIhBSswEN/KlDLUGWzs4W9LsAyH9x075cku92YgWjDGFXumMJr481AZQEF7RlboSOLXYyRCqiJN8DyFIOk6MXbvO2QKBgQDM9GTM1QtCUpySWCOe/QdRQ5cL0Bcxep3chGS+wGDLWFwfcKadF+z070mIuT7NtsSnJ98b30rw/LurfVrtXi+2PaT/XvCz3aiOcinaFF5ZE4Xt7aP+E6fYz9kXsBByso4eqerzWezB7B7yvQFqF2KArUTQ+J2ao1BL54yGmzqfhwKBgQC6uzseAZy+N61/Y1J1LjysRrDvdxNETeKm5v6N2YaOiVCis6nHaypofS+geFOo3N7+75zjLwpodt3jnNswKr+0/vqqzkwPNtWkyhKguU80baHAkBL1wncPu1KBURNyY3bnFinI+wJ5c7hVAKhVnwxXXQdSpv9717aIecXTlT9f3QKBgQCmnFYFHXtVowqc/QGYEWGNckCr3bG9C0yhIw8y8fi91UquVEldk0GRq6Q/fTfMyzL6H7ODWPX3Cb0WH4V3SQXIRDyJTIin7x1DDxNusPgxuWk6jeCufxQHcI+ubfYxB235B3Bz+zo4Ota9xWAM+o2cxT4YEsMsHm78BXN7SV1SqQKBgQCVRyizjEZqKsiglh5NX3FRqBG63k6gxEL1eqT1cXiIam30I/0OVzXH4ow4lPkMfcYnuBaL6AdCDATG+Zagowwu/cgW1GUppISXAJRzuLEBEMPG1WbS4WudP/ttNgt93tYnVyiAa2pG/aPXEHeCO2v6S3yXLrn/nytlXzQvOZk4YQKBgQDC49h/3P4Eqn2z9ErStCATIgYZvf9/xt4nhKROyzgjq8UNMEn42wakOEnZH2cXEL1aNgniGhf+G+H05HwWguuaR315had5O0kyp00Ih2mmQt0PQ/A0oyu7XbQIJn3Q54IPYeeTpEqkMfKCvjJ8FyT72G5UsIoG0ej/Zx3Uw6EMqg=="
const val publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlX93Fs2TRCA3lTPUKUKSZrGiWkAUpyqPokuHthhIRv21UrkTHff4JDm/vgPRIpTzJ7O9MwtuoZpa0e15BWuOTdPUXFhkXAagHPHFfh2IhSBEoCpz9vLNzr62YhZ3Ngnc0Y82ZnonqCGviDu9oW0SNx1ZzaaVKSNCx84g43B6geLIp2n9Iu2BQtIBbYwDrni2ThH6Q9V1JcJnW7GdVEDKMyvRbe6ly3YWpHoBPlTomAuY7W5AoBpfwYE6YFFiWjCOmumxGvC8KIJRYUvKBP8uXCtqeddDWsw9NcFI5F1OmwrRnjxBMrCMJl6ro3TryKh+3ANZlcGh8heOZvVamAfQiwIDAQAB"
const val oldToken = "eyJhbGciOiJSUzUxMiJ9.eyJkYXRlIjoxNTkxMTk2ODUwLCJvZmRJbm4iOiI3NzMxMzc2ODEyIn0.Dc8-jpM7MSSuSHKlPQgzw3bAP8N6ZCX-FthdbgFqMu1wKRNIy7DOBj0LC0GUozTg2j8ObUNr1iZMgu_BrrE976jHgdzZoLIYjQ7YNnPtBt2t6ETx0GszMMTu3MScAyIfV5kMEaFsMoW4MaKv7hGbVJbZqXQvaOcFP3sRCEwP-obc4zx85X8EGhEsUIBSevi5GOLU7_y4AVaeWX7gR7eJAGIZDtFoHpnHzKmvUY568sZ2umQJ6-HiMd99_NnbRv_WeC_3tRHRRwEuX_P0U983sdo8jVbQeTCBNMtBjCeX63zUdSgyVQO1kZB7xU2yo17JbfBEzgBGnqQZDPhEKqS7_A"

fun main() {
//  val keyPair = getNewKeyPair()
//  println("""
//keyPair=$keyPair
//keyPair.private=${keyPair.private}
//keyPair.public=${keyPair.public}
//keyPair.public.encoded=${keyPair.public?.encoded?.contentToString() ?: "null"}
//keyPair.public.format=${keyPair.public?.format ?: "null"}
//keyPair.private.encoded(string)=${Base64.getEncoder().encodeToString(keyPair.private.encoded)}
//keyPair.public.encoded(string)=${Base64.getEncoder().encodeToString(keyPair.public.encoded)}
//
//""")
//  val token = getNewToken(keyPair)
//  println("token=\n$token")

  val refreshedToken = refreshToken(privateKey)
  println("refreshed token=\n$refreshedToken")

  println()

  println("Old token expires in: ${getTimeBeforeExpiration(oldToken)}s")
}

fun refreshToken(privateKey: String): String {
  val header = JWSHeader.Builder(JWSHeader(JWSAlgorithm.RS512)).build()

  val claims = JWTClaimsSet.Builder()
      .claim("ofdInn", "7731376812")
      .claim("date", Instant.now().epochSecond)
      .build()

  val payload = Payload(claims.toJSONObject())

  val jwsObject = JWSObject(header, payload)
  jwsObject.sign(RSASSASigner(getPrivateKey(privateKey)))

  return jwsObject.serialize()
}

fun getPrivateKey(key: String): PrivateKey {
  val keySpec = PKCS8EncodedKeySpec(Base64.getDecoder().decode(key))
  val kf: KeyFactory = KeyFactory.getInstance("RSA")
  val privKey: PrivateKey = kf.generatePrivate(keySpec)
  return privKey
}

fun getTimeBeforeExpiration(token: String): Int {
  val payload = JWSObject.parse(token).payload.toJSONObject()

  val tokenDate = payload["date"] as Long
  return ((tokenDate + 3600) - Instant.now().epochSecond).toInt()
}

fun getNewToken(kp: KeyPair): String {
  val header = JWSHeader.Builder(JWSHeader(JWSAlgorithm.RS512)).build()

  val claims = JWTClaimsSet.Builder()
          .claim("ofdInn", "7731376812")
          .claim("date", Instant.now().epochSecond)
          .build()

  val payload = Payload(claims.toJSONObject())

  val privateKey = kp.private

  val jwsObject = JWSObject(header, payload)
  jwsObject.sign(RSASSASigner(privateKey))

  val fact = KeyFactory.getInstance("RSA")
  val spec = fact.getKeySpec(kp.public,
          X509EncodedKeySpec::class.java)
  val base64Encode = Base64.getEncoder().encodeToString(spec.encoded);

  return jwsObject.serialize()
}

fun getNewKeyPair(): KeyPair {
  val kpg = KeyPairGenerator.getInstance("RSA")
  kpg.initialize(2048)
  return kpg.generateKeyPair()
}