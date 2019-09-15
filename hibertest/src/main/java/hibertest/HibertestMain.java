package hibertest;

import hibertest.joinedtable.JoinedTableStrategy;
import hibertest.mappedsuperclass.MappedSuperclassStrategy;
import hibertest.singletable.SingleTableStrategy;
import hibertest.tableperclass.TablePerClassStrategy;
import hibertest.utils.StrategyExecutor;


public class HibertestMain {

    public static void main(String[] args) throws Exception {
        StrategyExecutor strategyExecutor = new StrategyExecutor();

        MappedSuperclassStrategy mappedSuperclassStrategy = new MappedSuperclassStrategy();
        TablePerClassStrategy tablePerClassStrategy = new TablePerClassStrategy();
        SingleTableStrategy singleTableStrategy = new SingleTableStrategy();
        JoinedTableStrategy joinedTableStrategy = new JoinedTableStrategy();

        //MAPPED_SUPERCLASS
        // Одна таблица для каждого класса кроме родителя (его поля будут в таблицах БД)
        //Полиморфные запросы (через вызов родителя) будут через отдельные селекты - плохо для производительности
        strategyExecutor.setStrategy(mappedSuperclassStrategy);
        strategyExecutor.executeStrategy();

        //TABLE_PER_CLASS
        // Одна таблица для каждого класса кроме родителя (его поля будут в таблицах БД)
        //Полиморфные запросы будут через UNION - лучше для производительности
        //Id обязательно должен быть вынесен в родителя
        strategyExecutor.setStrategy(tablePerClassStrategy);
        strategyExecutor.executeStrategy();

        //SINGLE_TABLE
        //Единая таблица для всей иерархии классов, поля всех классов собраны в кучу
        //Очень плохо для структуры БД и поддержки, но очень быстро
        strategyExecutor.setStrategy(singleTableStrategy);
        strategyExecutor.executeStrategy();

        //JOINED_TABLE
        //Одна таблица для каждого класса (даже для родителя) с использованием соединений (JOIN)
        //Родитель с детьми в БД будут иметь связь по внешнему ключу
        //Хорошо нормализованная БД, но возможны проблемы с производительностью
        strategyExecutor.setStrategy(joinedTableStrategy);
        strategyExecutor.executeStrategy();
    }
}