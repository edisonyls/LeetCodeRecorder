package com.yls.ylslc.data_structure;

import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class DataStructureServiceImpl implements DataStructureService{

    private final DataStructureRepository dataStructureRepository;
    private final UserService userService;

    @Override
    public DataStructureEntity createDataStructure(DataStructureEntity dataStructureEntity) {
        UserEntity userEntity = userService.getCurrentUser();
        dataStructureEntity.setUser(userEntity);
        return dataStructureRepository.save(dataStructureEntity);

    }

    @Override
    public List<DataStructureEntity> getDataStructures() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<UserEntity> currentUser = userService.findOneByUsername(username);
        return currentUser
                .map(dataStructureRepository::findByUser)
                .orElse(Collections.emptyList());
    }

    public DataStructureServiceImpl(DataStructureRepository dataStructureRepository, UserService userService) {
        this.dataStructureRepository = dataStructureRepository;
        this.userService = userService;
    }
}
