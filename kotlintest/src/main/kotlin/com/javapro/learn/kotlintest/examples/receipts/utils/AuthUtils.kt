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

const val privateKey = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuG6Ocy5tOfZkg/xn1mc1dfz4RkPbH0ofmmIOojLx4jGJIg30J66vUQiIWQhgZcn61e7IIA8go9gJMS1rdPBb9RfFHy4Ev+GU2Z0F0ZQRH6+w5W0+3/uBg53c794tuhEJs6lbiNYZb7QTutO0uns4j0+mSa3pEAHlkIs90GmckVS2tlzQ3TReFNcp+UEwh8U3FFNXox91GkyahBI8jL4W5pK5jYXT2TQbfScN8gxbVxMh13689SjoZLEnGKcW0y6LVmZWUwej/oLzTkwQCkwiR/DPTYOiU+FSWLGrw6+sesKvTX+PZetJ2F9erT6/Ii0nPKI1Rt+cRsU/8jP/zuoXrAgMBAAECggEACOGSC/p61psjh4JbwaJxzlYiRWUeoXzEv+eBt8RODNwkW0yRwULLRg2FjZsbfZjQi9Nedngy6pv57Ahf/y8EgTDjKOVhlp/WEdtchGJuwHhxWU+mFl2i9m54L4/mBeIrPUEK44kVbHT/rml+O8WQAFXb8UMYPoXDq273JBYAsuKrqOUvbsSJ8xghzD3ba/CTijFNi4e8VrI35rsN85QdE6yrh8JMR7t+RYCRe112XyIcTvIS1ebYld9BlY0DDwddsNvyVROKFpD8tsBe6RA3gP2m9EhSV1csGXzoEInUT3E7eA6gS8P8Fyx5OeuvZ7HtOIHqBZ4kCJHEOdoQV8YU6QKBgQD0ECOvBEMkjTU1kf7QPvtcLR/bPy6Qp8c9R7KLOaPp48mSPInmH1/qQk2PVTPSLGzYNNWpWAwYQrCCKSrGyMH8FJZP7dIbuZIiQTW9vdWGNVJ4xMqzK7wAhGSuycUqA51JjTbyf9lfzwEnn7No5CL7QmLTJrw5aIkGQmp9pNrU3wKBgQC2n5t4CBSxEDHUYKqle+MRnvAFjKGA0DkkeJFLATP0EcJcD7qILMmUTgusdms9Q7ALvcFeCd8PyXo2luaY6seppYyPxxv5hxDhMlRDobI1djpj/i2OMNXBwUvdvJAjGs3vO1rrzneSHTSFvoDWSyZNmQO2/MtOzYwVru6mnlREdQKBgG3AYDuQ4Bysv1PCvmKpH+G4jQ3L4MW+HROKjVicaACCpZ90R9LLIxe2Dyi4eOA3iA7F25sWdAHo43T0zD6uAsW4AEwbNxOupG9xAZi8qCt9CQQ0Aq8FqLpWzuvm4hndnDp6HU55fafe77cA0u4FQVHZ7ZTkY1oxjwTYkwjDPIDjAoGAAxqvb9jjUScvUaba/7kdYP1MoyuCy0e+0Onjvlyk32812I7D4vCv9H9nH2Vb6UyvP2PYV5rfWctY8niaLts+zZlszDzcMt+i39EVMZkcCGCcGXsGlzYpTAPXIEvGP3KDMZ/Wqc92pNsuO1/DnODmI8eIEqI1an9/9BZnJBno4MkCgYBt5Wx+GkPJs/MQOwGDqByAZTCMVB3FaslUbxrAuvnm0kq1UaHYL3CUbA/XVYwy1tCD1IS6Lod7FHKZGTC6g6mwyOuCdUzAmppXVHTsooH9iB/tUqUdwxXVJygD15ECFSlXTBy6j8S8mdqIImZeU4tEaMYgQ1wB+5V41fwH6R0jkw=="
const val publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArhujnMubTn2ZIP8Z9ZnNXX8+EZD2x9KH5piDqIy8eIxiSIN9Ceur1EIiFkIYGXJ+tXuyCAPIKPYCTEta3TwW/UXxR8uBL/hlNmdBdGUER+vsOVtPt/7gYOd3O/eLboRCbOpW4jWGW+0E7rTtLp7OI9Ppkmt6RAB5ZCLPdBpnJFUtrZc0N00XhTXKflBMIfFNxRTV6MfdRpMmoQSPIy+FuaSuY2F09k0G30nDfIMW1cTIdd+vPUo6GSxJxinFtMui1ZmVlMHo/6C805MEApMIkfwz02DolPhUlixq8OvrHrCr01/j2XrSdhfXq0+vyItJzyiNUbfnEbFP/Iz/87qF6wIDAQAB"
const val oldToken = "eyJhbGciOiJSUzUxMiJ9.eyJkYXRlIjoxNTkxMjk0ODM5LCJvZmRJbm4iOiI3NzMxMzc2ODEyIn0.C2er0-pGw7qjLiCsAQUd2omuLBKS2n8Peu1gxTRR-_ffDBG9Gq8GlGcWAYVbWwuDXD_M4vN2IixKL1H0ea-RVVxpbwBAn-FKmLZ_v1-OrKsIroU-Kg5xyUBwIqVOk5dlsw8BD8OxOvshUZEEdtJR_oWiIcyv-iUkwU9NI5kmoWxG9_YR-zqLsP09bWLSWB0uTSXBDCoX2RCkb81xcgjvMqiHjgfAUips2AaDkyzCA19mRrQWqXFKh02BFFOlw3B2qE1tN2A-1Z37EvU2ZqajjqmaYdoJo9INdcAmzHKRrDFdG2N56CWlOxrk1OzY30cgfFA0q_OzLBmDiSJHO39iHA"

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