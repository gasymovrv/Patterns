package serialization;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import serialization.domain.Car;
import serialization.domain.ParkingCatalog;
import serialization.domain.Truck;
import serialization.domain.VehicleParking;

public class Main {
    public static void main(String[] args) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.enable(SerializationFeature.INDENT_OUTPUT);
        xmlMapper.registerModule(new JavaTimeModule());
        //xmlMapper.registerModule(new JaxbAnnotationModule());

        File file = new File("serialization/src/main/resources/parking-catalog-in.xml");
        File outFile = new File("serialization/src/main/resources/parking-catalog-out.xml");

        ParkingCatalog parkingCatalog;
        if (!file.exists()) {
            parkingCatalog = createNewParkingCatalog();
            xmlMapper.writeValue(file, parkingCatalog);
        } else {
            parkingCatalog = xmlMapper.readValue(file, ParkingCatalog.class);
        }
        changeParkingCatalog(parkingCatalog);
        xmlMapper.writeValue(outFile, parkingCatalog);

    }

    private static ParkingCatalog createNewParkingCatalog() {
        //------------------------------- Truck station 1 -------------------------------------

        VehicleParking<Truck> truckParking = new VehicleParking<>("Truck station 1");

        truckParking.getPhoneNumbers().addAll(List.of("9911034731", "9911033478"));

        Truck maz = new Truck();
        maz.setWagonSize(5);
        maz.setMaker("МАЗ");
        maz.setModel("01");
        maz.setProductionDate(LocalDate.now());

        Truck kamaz = new Truck();
        kamaz.setWagonSize(5);
        kamaz.setMaker("КАМАЗ");
        kamaz.setModel("57904");
        kamaz.setProductionDate(LocalDate.now());

        truckParking.getVehicles().addAll(List.of(maz, kamaz));
        truckParking.getVehiclesByName().putAll(Map.of("MY_TRUCK1", maz, "MY_TRUCK2", kamaz));

        //------------------------------- Car station 1 -------------------------------------

        VehicleParking<Car> carParking = new VehicleParking<>("Car station 1");

        carParking.getPhoneNumbers().add("1234567890");

        Car kia = new Car();
        kia.setNumberOfPassengers(5);
        kia.setMaker("KIA");
        kia.setModel("Sportage");
        kia.setProductionDate(LocalDate.now());

        carParking.getVehicles().add(kia);
        carParking.getVehiclesByName().put("MY_CAR1", kia);

        ParkingCatalog parkingCatalog = new ParkingCatalog();
        parkingCatalog.getTruckVehicleParkings().add(truckParking);
        parkingCatalog.getCarVehicleParkings().add(carParking);

        return parkingCatalog;
    }

    private static void changeParkingCatalog(ParkingCatalog parkingCatalog) {
        List<VehicleParking<Car>> parkingList = parkingCatalog.getCarVehicleParkings();
        VehicleParking<Car> carParking = parkingList.get(0);

        Car nexia = new Car();
        nexia.setNumberOfPassengers(5);
        nexia.setMaker("Daewoo");
        nexia.setModel("Nexia");
        nexia.setProductionDate(LocalDate.now());
        carParking.getVehicles().add(nexia);

        VehicleParking<Car> newCarParking = new VehicleParking<>("Car station 2");

        newCarParking.getPhoneNumbers().add("2234567890");

        Car bmv = new Car();
        bmv.setNumberOfPassengers(5);
        bmv.setMaker("BMV");
        bmv.setModel("X6");
        bmv.setProductionDate(LocalDate.now());

        newCarParking.getVehicles().add(bmv);

        parkingCatalog.getCarVehicleParkings().add(newCarParking);
    }
}
