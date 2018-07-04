package ru.unlimit.javapro.patterns;

import java.util.Date;

public class FactoryMethodApp {

	public static void main(String[] args) {
		WatchMaker maker = WatchMaker.getMakerByName("Digital");
		
		Watch watch = maker.createWatch();

		watch.showTime();
	}
}
//------------------------------------products----------------------------------
//abstract product
interface Watch{
	void showTime();
}
//concrete product 1
class DigitalWatch implements Watch{
	public void showTime() {
		System.out.println(new Date());
	}
}
//concrete product 2
class RomeWatch implements Watch{
	public void showTime() {
		System.out.println("VII-XX");
	}
}


//----------------------------------factories------------------------------------
//abstract factory
interface WatchMaker{
	Watch createWatch();
	static WatchMaker getMakerByName(String maker){
		if(maker.equals("Digital"))
			return new DigitalWatchMaker();
		else if(maker.equals("Rome"))
			return new RomeWatchMaker();
		throw new RuntimeException("Не поддерживаемая производственная линия часов: "+ maker);
	}
}
//concrete factory 1
class DigitalWatchMaker implements WatchMaker{
	public Watch createWatch() {
		return new DigitalWatch();
	}
}
//concrete factory 2
class RomeWatchMaker implements WatchMaker{
	public Watch createWatch() {
		return new RomeWatch();
	}
}