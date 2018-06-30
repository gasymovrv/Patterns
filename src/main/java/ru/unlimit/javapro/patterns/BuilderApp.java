package ru.unlimit.javapro.patterns;

public class BuilderApp {

	public static void main(String[] args) {
//C настройками
// 		Car car = new CarBuilder()
//					.buildMake("Mercedes")
//					.buildTransmission(Transmission.AUTO)
//					.buildMaxSpeed(280)
//					.build();
//		System.out.println(car);

//через директора
		Director director = new Director();
		director.setBuilder(new FordMondeoBuilder());
		Car car = director.BuildCar();
		System.out.println(car);

//напрямую через строителя, здесь можно использоват методы с параметрами как в закомментированном коде ниже
		Car car2 = new SubaruBuilder()
				.buildMake()
				.buildTransmission()
				.buildMaxSpeed()
				.getCar();
		System.out.println(car2);
	}
}


enum Transmission{
	MANUAL, AUTO
}
class Car{
	String make;
	Transmission transmission;
	int maxSpeed;
	
	public void setMake(String make) {this.make = make;}
	public void setTransmission(Transmission transmission) {this.transmission = transmission;}
	public void setMaxSpeed(int maxSpeed) {this.maxSpeed = maxSpeed;}
	@Override
	public String toString() {
		return "Car [make=" + make + ", transmission=" + transmission
				+ ", maxSpeed=" + maxSpeed + "]";
	}
	
}
abstract class CarBuilder{
	Car car;

	public CarBuilder() {
		car = new Car();
	}
	
	abstract CarBuilder buildMake();
	abstract CarBuilder buildTransmission();
	abstract CarBuilder buildMaxSpeed();
	
	Car getCar(){return car;}
}

class FordMondeoBuilder extends CarBuilder{
	CarBuilder buildMake() {car.setMake("Ford Mondeo"); return this;}
	CarBuilder buildTransmission() {car.setTransmission(Transmission.AUTO); return this;}
	CarBuilder buildMaxSpeed() {car.setMaxSpeed(260); return this;}
}
class SubaruBuilder extends CarBuilder{
	CarBuilder buildMake() {car.setMake("Subaru"); return this;}
	CarBuilder buildTransmission() {car.setTransmission(Transmission.MANUAL); return this;}
	CarBuilder buildMaxSpeed() {car.setMaxSpeed(320); return this;}
}

class Director{
	private CarBuilder builder;
	void setBuilder(CarBuilder b){builder = b;}
	
	Car BuildCar(){
		builder.buildMake().buildTransmission().buildMaxSpeed();
		return builder.getCar();
	}
}


//class CarBuilder{
//	
//	String m = "Default";
//	Transmission t = Transmission.MANUAL;
//	int s = 120;
//	
//	CarBuilder buildMake(String m){
//		this.m = m;
//		return this;
//	}
//	CarBuilder buildTransmission(Transmission t){
//		this.t = t;
//		return this;
//	}
//	CarBuilder buildMaxSpeed(int s){
//		this.s = s;
//		return this;
//	}
//	Car build(){
//		Car car = new Car();
//		car.setMake(m);
//		car.setTransmission(t);
//		car.setMaxSpeed(s);
//		return car;
//	}
//}