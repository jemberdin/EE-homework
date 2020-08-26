package com.jemberdin.crud;

import com.jemberdin.crud.model.User;
import com.jemberdin.crud.repository.CrudUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.time.LocalDate;

@SpringBootApplication
public class CrudApplication {

	private final CrudUserRepository userRepository;

	@Autowired
	public CrudApplication(CrudUserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}

	@PostConstruct
	public void addMockData() {
		userRepository.save(new User(
				null,
				"Ain",
				"Kala",
				LocalDate.of(1990, 11, 11),
				"ain.kala@gmail.com",
				"Viirati 13 Tallinn")
		);
		userRepository.save(new User(
				null,
				"Siiru",
				"Viiru",
				LocalDate.of(1980, 01, 11),
				"siiru.viiru@gmail.com",
				"Soo 10 Tallinn")

		);
		userRepository.save(new User(
				null,
				"Heli",
				"Kopter",
				LocalDate.of(1985, 06, 22),
				"heli.kopter@gmail.com",
				"Prantsusmaa")
		);
	}

}
