package serialization.domain;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;


@JacksonXmlRootElement(localName = "parkingCatalog")
@Data
public class ParkingCatalog implements Serializable {
    @JacksonXmlElementWrapper(localName = "truckVehicleParkings")
    @JacksonXmlProperty(localName = "truckVehicleParking")
    private List<VehicleParking<Truck>> truckVehicleParkings = new ArrayList<>();

    @JacksonXmlElementWrapper(localName = "carVehicleParkings")
    @JacksonXmlProperty(localName = "carVehicleParking")
    private List<VehicleParking<Car>> carVehicleParkings = new ArrayList<>();
}
