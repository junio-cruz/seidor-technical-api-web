import {
  booleanValidatorSchema,
  driverValidatorSchema,
  nameValidatorSchema,
  pageSizeValidatorSchema,
  pageValidatorSchema,
  photoValidatorSchema,
  stringValidatorSchema,
  uuidV4ValidatorSchema,
  vehicleValidatorSchema,
} from './validators';

describe('validatorSchemas', () => {
  it('should return uuidV4ValidatorSchema with optional false by default', () => {
    expect(uuidV4ValidatorSchema({})).toEqual({
      type: 'uuid',
      version: 4,
      optional: false,
    });
  });

  it('should return uuidV4ValidatorSchema with optional true', () => {
    expect(uuidV4ValidatorSchema({ optional: true })).toEqual({
      type: 'uuid',
      version: 4,
      optional: true,
    });
  });

  it('should return nameValidatorSchema', () => {
    expect(nameValidatorSchema({})).toEqual({ type: 'string', optional: false });
    expect(nameValidatorSchema({ optional: true })).toEqual({
      type: 'string',
      optional: true,
    });
  });

  it('should return vehicleValidatorSchema', () => {
    const schema = vehicleValidatorSchema({});

    expect(schema.type).toBe('object');
    expect(schema.optional).toBe(false);
    expect(schema.props.vehicle_id).toEqual({
      type: 'uuid',
      version: 4,
      optional: false,
    });
    expect(schema.props.plate).toEqual({ type: 'string', optional: false });
    expect(schema.props.mark).toEqual({ type: 'string', optional: false });
    expect(schema.props.color).toEqual({ type: 'string', optional: false });

    expect(vehicleValidatorSchema({ optional: true }).optional).toBe(true);
  });

  it('should return driverValidatorSchema', () => {
    const schema = driverValidatorSchema({});

    expect(schema.type).toBe('object');
    expect(schema.optional).toBe(false);
    expect(schema.props.driver_id).toEqual({
      type: 'uuid',
      version: 4,
      optional: false,
    });
    expect(schema.props.name).toEqual({ type: 'string', optional: false });

    expect(driverValidatorSchema({ optional: true }).optional).toBe(true);
  });

  it('should return pageValidatorSchema', () => {
    expect(pageValidatorSchema({})).toEqual({
      type: 'number',
      integer: true,
      min: 1,
      convert: true,
      optional: false,
    });
    expect(pageValidatorSchema({ optional: true }).optional).toBe(true);
  });

  it('should return pageSizeValidatorSchema', () => {
    expect(pageSizeValidatorSchema({})).toEqual({
      type: 'number',
      integer: true,
      min: 1,
      convert: true,
      optional: false,
    });
    expect(pageSizeValidatorSchema({ optional: true }).optional).toBe(true);
  });

  it('should return photoValidatorSchema', () => {
    expect(photoValidatorSchema({})).toEqual({ type: 'string', optional: false });
    expect(photoValidatorSchema({ optional: true })).toEqual({
      type: 'string',
      optional: true,
    });
  });

  it('should return stringValidatorSchema', () => {
    expect(stringValidatorSchema({})).toEqual({ type: 'string', optional: false });
    expect(stringValidatorSchema({ optional: true })).toEqual({
      type: 'string',
      optional: true,
    });
  });

  it('should return booleanValidatorSchema', () => {
    expect(booleanValidatorSchema({})).toEqual({
      type: 'boolean',
      convert: true,
      optional: false,
    });
    expect(booleanValidatorSchema({ optional: true })).toEqual({
      type: 'boolean',
      convert: true,
      optional: true,
    });
  });
});
