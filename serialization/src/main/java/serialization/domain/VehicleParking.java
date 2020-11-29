package serialization.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class VehicleParking<T extends Vehicle> implements Serializable {

    private final String name;
    @JacksonXmlElementWrapper(localName = "phoneNumbers")
    @JacksonXmlProperty(localName = "phone")
    private List<String> phoneNumbers = new ArrayList<>();
    @JacksonXmlElementWrapper(localName = "vehicles")
    @JacksonXmlProperty(localName = "vehicle")
    private List<T> vehicles = new ArrayList<>();
    @JacksonXmlProperty(localName = "vehiclesByName", isAttribute = true)
    private Map<String, T> vehiclesByName = new HashMap<>();


    @JsonCreator
    public VehicleParking(@JacksonXmlProperty(localName = "name") String name) {
        this.name = name;
    }
}