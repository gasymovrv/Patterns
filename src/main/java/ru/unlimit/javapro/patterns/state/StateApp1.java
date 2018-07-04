package ru.unlimit.javapro.patterns.state;

/**
 * Реализация шаблона состояние 1
 * Переключение состояний делается контекстом
 */
public class StateApp1 {
	public static void main(String[] args) {
		Radio radio = new Radio();
		radio.setStation(new RadioRecord());

		for(int i=0; i<10;i++){
			radio.play();
			radio.nextStation();
		}
	}
}

//Context
class Radio{
	private Station station;
	void setStation(Station st){station = st;}
	void nextStation(){
		if(station instanceof RadioEurope){
			setStation(new RadioRecord());
		}
		else if(station instanceof RadioRecord){
			setStation(new RadioVestiFM());
		}
		else if(station instanceof RadioVestiFM){
			setStation(new RadioEurope());
		}
	}
	//request
	void play(){
		station.play();
	}
}

//State
interface Station{
	//handle
	void play();
}
//ConcreteState
class RadioEurope implements Station{
	public void play() {System.out.println("Радио \"Европа+\"...");}
}
//ConcreteState
class RadioRecord implements Station{
	public void play() {System.out.println("Радио \"Record\"...");}
}
//ConcreteState
class RadioVestiFM implements Station{
	public void play() {System.out.println("Радио \"Вести FM\"...");}
}