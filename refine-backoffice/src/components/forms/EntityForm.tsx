'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from '@/lib/i18n';
import { cn, formVariants, inputVariants, buttonVariants, text } from '@/lib/utils';
import { EntityField, EntityConfig } from '@/types';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';

interface EntityFormProps {
  entityConfig: EntityConfig;
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
  loading?: boolean;
  mode: 'create' | 'edit';
}

export function EntityForm({
  entityConfig,
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  mode
}: EntityFormProps) {
  const { t, direction } = useI18n();
  const [showPassword, setShowPassword] = React.useState(false);

  // Generate Zod schema based on entity fields
  const generateSchema = (fields: EntityField[]) => {
    const schemaObject: Record<string, any> = {};

    fields.forEach(field => {
      if (field.displayInForm) {
        let fieldSchema: any;

        switch (field.type) {
          case 'string':
          case 'textarea':
            fieldSchema = z.string();
            if (field.required) {
              fieldSchema = fieldSchema.min(1, t('forms.validation.required'));
            }
            break;
          case 'email':
            fieldSchema = z.string().email(t('forms.validation.email'));
            if (field.required) {
              fieldSchema = fieldSchema.min(1, t('forms.validation.required'));
            }
            break;
          case 'url':
            fieldSchema = z.string().url('Please enter a valid URL');
            if (field.required) {
              fieldSchema = fieldSchema.min(1, t('forms.validation.required'));
            }
            break;
          case 'number':
            fieldSchema = z.number().min(0);
            if (field.required) {
              fieldSchema = fieldSchema.min(0, t('forms.validation.min', { min: 0 }));
            }
            break;
          case 'boolean':
            fieldSchema = z.boolean();
            break;
          case 'date':
            fieldSchema = z.string();
            if (field.required) {
              fieldSchema = fieldSchema.min(1, t('forms.validation.required'));
            }
            break;
          case 'select':
            fieldSchema = z.string();
            if (field.required) {
              fieldSchema = fieldSchema.min(1, t('forms.validation.required'));
            }
            break;
          default:
            fieldSchema = z.string();
        }

        schemaObject[field.name] = fieldSchema;
      }
    });

    return z.object(schemaObject);
  };

  const schema = generateSchema(entityConfig.fields);
  const formFields = entityConfig.fields.filter(field => field.displayInForm);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: 'onChange'
  });

  const handleFormSubmit = (data: Record<string, any>) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      reset();
    }
  };

  const renderField = (field: EntityField) => {
    const fieldError = errors[field.name];
    const fieldValue = watch(field.name);

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <textarea
              {...register(field.name)}
              id={field.name}
              rows={4}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' }),
                'resize-none'
              )}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <select
              {...register(field.name)}
              id={field.name}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' })
              )}
            >
              <option value="">Select {field.label.toLowerCase()}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <input
              {...register(field.name)}
              type="checkbox"
              id={field.name}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <input
              {...register(field.name)}
              type="date"
              id={field.name}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' })
              )}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      case 'email':
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <input
              {...register(field.name)}
              type="email"
              id={field.name}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' })
              )}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      case 'url':
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <input
              {...register(field.name)}
              type="url"
              id={field.name}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' })
              )}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <input
              {...register(field.name, { valueAsNumber: true })}
              type="number"
              id={field.name}
              step={field.name === 'price' ? '0.01' : '1'}
              min={0}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' })
              )}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <input
              {...register(field.name)}
              type="text"
              id={field.name}
              className={cn(
                inputVariants({ variant: fieldError ? 'error' : 'default' })
              )}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError.message as string}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className={text.h2}>
          {mode === 'create' 
            ? t(`${entityConfig.name}.createTitle`)
            : t(`${entityConfig.name}.editTitle`)
          }
        </h2>
        <p className={text.muted}>
          {entityConfig.description}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className={formVariants({ layout: 'default' })}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {formFields.map(field => renderField(field))}
        </div>

        <div className={cn(
          'flex items-center gap-4 pt-6',
          direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
        )}>
          <button
            type="submit"
            disabled={!isValid || loading}
            className={buttonVariants({ size: 'lg' })}
          >
            {loading ? t('common.loading') : t('common.save')}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              {t('common.cancel')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}