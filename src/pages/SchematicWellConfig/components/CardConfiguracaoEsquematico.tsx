import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useAddSchematicConfigMutation } from 'features/api/services/schematicWell/schematicConfigCRUD';
// import { useAddManySurfaceEquipmentsMutation } from 'features/api/services/schematicWell/surfaceEquipmentsCRUD';
import { Well } from 'features/wells/interfaces';

import { RequiredField } from 'components/RequiredField/RequiredField';

// import { regexRemoverCaracteresEspeciais } from 'utils/RegexCaracteresEspeciais';

// const md5 = require('md5');

interface SurfaceEquipment {
  surfaceEquipment: string;
  description: string;
}

interface FormValues {
  depth: number;
  surfaceEquipments: SurfaceEquipment[];
}

function CardConfiguracaoEsquematico() {
  const [formValues, setFormValues] = useState<FormValues>({
    surfaceEquipments: [] as SurfaceEquipment[],
    depth: 0,
  });

  // const [addManySurfaceEquipments] = useAddManySurfaceEquipmentsMutation();
  const [addSchematicConfig] = useAddSchematicConfigMutation();
  const navigate = useNavigate();
  const { well } = useLocation().state as { well: Well };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
  //   const { name, value } = event.target;

  //   if (name.includes('surfaceEquipment')) {
  //     const newSurfaceEquipments = [...formValues.surfaceEquipments];
  //     newSurfaceEquipments[index].surfaceEquipment = value;
  //     setFormValues({ ...formValues, surfaceEquipments: newSurfaceEquipments });
  //   } else if (name.includes('description')) {
  //     const newSurfaceEquipments = [...formValues.surfaceEquipments];
  //     newSurfaceEquipments[index].description = value;
  //     setFormValues({ ...formValues, surfaceEquipments: newSurfaceEquipments });
  //   }
  // };

  // const addSurfaceEquipmentToFormValues = () => {
  //   setFormValues({
  //     ...formValues,
  //     surfaceEquipments: [
  //       ...formValues.surfaceEquipments,
  //       {
  //         surfaceEquipment: '',
  //         description: '',
  //       },
  //     ],
  //   });
  // };

  // const removeSurfaceEquipment = (index: number) => {
  //   const newSurfaceEquipments = [...formValues.surfaceEquipments];
  //   newSurfaceEquipments.splice(index, 1);
  //   setFormValues({ ...formValues, surfaceEquipments: newSurfaceEquipments });
  // };

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const DATA_SOURCE = `${process.env.REACT_APP_DATA_SOURCE_ID}`;
    const DATABASE = `${process.env.REACT_APP_DATABASE}`;
    // const onlyValidSurfaceEquipments = formValues.surfaceEquipments.filter(
    //   (surfaceEquipment: SurfaceEquipment) =>
    //     surfaceEquipment.surfaceEquipment !== '' && surfaceEquipment.description !== '',
    // );
    // if (formValues.surfaceEquipments.length >= 1) {
    //   const surfaceEquipmentsPayload = {
    //     dataSource: DATA_SOURCE,
    //     database: DATABASE,
    //     collection: 'schematic-well-surface-equipments',
    //     documents: onlyValidSurfaceEquipments.map((surfaceEquipment: SurfaceEquipment) => ({
    //       ...surfaceEquipment,
    //       hash: md5(surfaceEquipment.surfaceEquipment + Math.random()),
    //       well: {
    //         id: well._id,
    //         name: well.nome_poco,
    //       },
    //     })),
    //   };
    //   addManySurfaceEquipments(surfaceEquipmentsPayload);
    // }
    const schamaticConfigPayload = {
      dataSource: DATA_SOURCE,
      database: DATABASE,
      collection: 'schematic-well-config',
      document: {
        well: {
          id: well._id,
          name: well.nome_poco,
        },
        maxDepth: formValues.depth,
      },
    };
    addSchematicConfig(schamaticConfigPayload);
    setFormValues({
      surfaceEquipments: [] as SurfaceEquipment[],
      depth: 0,
    });
    navigate(`/esquematico-well/${well._id}`, { state: { well } });
  };

  const isButtonDisabled = formValues.depth === 0;

  // if (maxDepth !== 0) {
  //   navigate(`/esquematico-well/${well._id}`, { state: { well } });
  // }

  return (
    <Flex
      minW={'536px'}
      h={'fit-content'}
      borderRadius={'8px'}
      boxShadow={'0px 0px 6px rgba(0, 0, 0, 0.25)'}
      p={6}
      direction={'column'}
      gap={4}
      alignItems={'flex-start'}
    >
      <Text fontSize={'20px'} fontWeight={700} color={'#262626'}>
        Configuração do Esquemático
      </Text>
      <FormControl>
        <Flex gap={1}>
          <RequiredField />
          <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
            ÁREA MAIS PROFUNDA (METROS)
          </Text>
        </Flex>
        <NumberInput
          min={0}
          max={99999999}
          value={formValues.depth}
          onChange={(valueString) => {
            setFormValues({
              ...formValues,
              depth: Number(valueString),
            });
          }}
        >
          <NumberInputField h={'56px'} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      {/* <Flex gap={4} align={'center'}>
        <Text fontSize={'20px'} fontWeight={700} color={'#262626'}>
          Equipamentos de Superfície
        </Text>
        <IconButton
          borderRadius={'8px'}
          border={'1px'}
          aria-label="Botão de Adicionar"
          icon={<AiFillPlusCircle size={22} />}
          variant="origemEditOutline"
          onClick={() => addSurfaceEquipmentToFormValues()}
        />
      </Flex> */}
      {/* <Flex direction={'column'} gap={4} flex={1}>
        {formValues.surfaceEquipments.length === 0 && (
          <Flex direction={'column'} align={'center'} justify={'center'} flex={1}>
            <Text fontSize={'18px'} fontWeight={700} color={'#737373'}>
              Nenhum Equipamento de Superfície Adicionado
            </Text>
          </Flex>
        )}
        {formValues.surfaceEquipments.map((surfaceEquipment: SurfaceEquipment, index: number) => (
          <Flex key={index} gap={4} align={'center'} justify={'center'}>
            <FormControl>
              <Flex gap={1}>
                <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                  EQUIPAMENTO
                </Text>
              </Flex>
              <Input
                variant={'origem'}
                isRequired
                placeholder="Equipamento de Superfície"
                id={'surfaceEquipment'}
                type="text"
                name={'surfaceEquipment'}
                value={regexRemoverCaracteresEspeciais(surfaceEquipment.surfaceEquipment)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
                maxLength={50}
              />
            </FormControl>
            <FormControl>
              <Flex gap={1}>
                <Text fontWeight={'700'} fontSize={'12px'} color={'#949494'}>
                  DESCRIÇÃO
                </Text>
              </Flex>
              <Input
                variant={'origem'}
                isRequired
                placeholder="Descrição"
                id={'description'}
                type="text"
                name={'description'}
                value={regexRemoverCaracteresEspeciais(surfaceEquipment.description)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
                maxLength={50}
              />
            </FormControl>
            <IconButton
              mt={4}
              width={'56px'}
              aria-label="Botão de Remover"
              icon={<FiTrash />}
              variant="origemDeleteGhost"
              onClick={() => removeSurfaceEquipment(index)}
            />
          </Flex>
        ))}
      </Flex> */}
      <Button
        isDisabled={isButtonDisabled}
        variant={'origemBlueSolid'}
        w={'100%'}
        onClick={(event: React.MouseEvent<HTMLElement>) => handleSubmit(event)}
      >
        Salvar
      </Button>
    </Flex>
  );
}

export default CardConfiguracaoEsquematico;
