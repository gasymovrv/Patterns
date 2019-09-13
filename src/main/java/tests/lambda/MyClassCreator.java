package tests.lambda;

import tests.MyClass;

public interface MyClassCreator {
   MyClass func(Long id, String info);
}
