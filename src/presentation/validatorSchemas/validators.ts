export const uuidV4ValidatorSchema = ({ optional = false }) => ({
  type: 'uuid',
  version: 4,
  optional,
});

export const nameValidatorSchema = ({ optional = false }) => ({
  type: 'string',
  optional,
});

export const vehicleValidatorSchema = ({ optional = false }) => ({
  type: 'objetc',
  props: {
    vehicle_id: uuidV4ValidatorSchema({ optional: false }),
    plate: stringValidatorSchema({ optional: false }),
    mark: stringValidatorSchema({ optional: false }),
    color: stringValidatorSchema({ optional: false }),
  },
  optional,
});

export const driverValidatorSchema = ({ optional = false }) => ({
  type: 'objetc',
  props: {
    "driver_id": uuidV4ValidatorSchema({ optional: false }),
    name: nameValidatorSchema({ optional: false }),
  },
  optional,
});

export const pageValidatorSchema = ({ optional = false }) => ({
  type: 'number',
  integer: true,
  min: 1,
  convert: true,
  optional,
});

export const pageSizeValidatorSchema = ({ optional = false }) => ({
  type: 'number',
  integer: true,
  min: 1,
  convert: true,
  optional,
});

export const photoValidatorSchema = ({ optional = false }) => ({
  type: 'string',
  optional,
});


export const stringValidatorSchema = ({ optional = false }) => ({
  type: 'string',
  optional,
});

export const booleanValidatorSchema = ({ optional = false }) => ({
  type: 'boolean',
  convert: true,
  optional,
});
