package com.yls.ylslc.data_structure;

import com.yls.ylslc.user.UserEntity;
import com.yls.ylslc.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

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
        List<DataStructureEntity> dataStructures = currentUser
                .map(dataStructureRepository::findByUser)
                .orElse(Collections.emptyList());
        dataStructures.sort(Comparator.comparing(DataStructureEntity::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder())));
        return dataStructures;

    }

    @Override
    public boolean isExist(UUID id) {
        return dataStructureRepository.existsById(id);
    }

    @Override
    public DataStructureEntity updateName(UUID id, String name) {
        DataStructureEntity dataStructureEntity = dataStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Data structure not found!"));
        dataStructureEntity.setName(name);
        return dataStructureRepository.save(dataStructureEntity);
    }

    @Override
    @Transactional
    public DataStructureEntity delete(UUID id) {
        DataStructureEntity dataStructureEntity = dataStructureRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Data structure not found!"));
        dataStructureRepository.deleteById(id);
        return dataStructureEntity;
    }

    public DataStructureServiceImpl(DataStructureRepository dataStructureRepository, UserService userService) {
        this.dataStructureRepository = dataStructureRepository;
        this.userService = userService;
    }
}
