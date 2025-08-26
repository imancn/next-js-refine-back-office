'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { cn, cardVariants, badgeVariants, text, buttonVariants } from '@/lib/utils';
import { EntityHistory, EntityField } from '@/types';
import { Clock, User, FileText, ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface HistoryViewerProps {
  history: EntityHistory[];
  fields: EntityField[];
  entityName: string;
  className?: string;
}

export function HistoryViewer({
  history,
  fields,
  entityName,
  className
}: HistoryViewerProps) {
  const { t, direction } = useI18n();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showDetails, setShowDetails] = useState<Set<string>>(new Set());

  if (!history || history.length === 0) {
    return (
      <div className={cn(cardVariants(), 'p-6', className)}>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">{t('history.noChanges')}</p>
          </div>
        </div>
      </div>
    );
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const toggleDetails = (id: string) => {
    const newDetails = new Set(showDetails);
    if (newDetails.has(id)) {
      newDetails.delete(id);
    } else {
      newDetails.add(id);
    }
    setShowDetails(newDetails);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return <div className="h-2 w-2 rounded-full bg-green-500" />;
      case 'UPDATE':
        return <div className="h-2 w-2 rounded-full bg-blue-500" />;
      case 'DELETE':
        return <div className="h-2 w-2 rounded-full bg-red-500" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'UPDATE':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'DELETE':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatValue = (value: any, fieldType: string) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">null</span>;
    }

    switch (fieldType) {
      case 'boolean':
        return (
          <span className={cn(
            badgeVariants({ variant: value ? 'success' : 'secondary' })
          )}>
            {value ? 'Yes' : 'No'}
          </span>
        );
      case 'date':
        return new Date(value).toLocaleString();
      case 'number':
        return fieldType === 'price' ? `$${Number(value).toFixed(2)}` : value;
      case 'select':
        if (fieldType === 'status') {
          return t(`${entityName}.statuses.${value}`) || value;
        }
        if (fieldType === 'role') {
          return t(`${entityName}.roles.${value}`) || value;
        }
        return value;
      default:
        return String(value);
    }
  };

  const renderChanges = (changes: Record<string, any>, previousValues?: Record<string, any>, newValues?: Record<string, any>) => {
    const changedFields = Object.keys(changes);
    
    if (changedFields.length === 0) {
      return <p className="text-muted-foreground">{t('history.noChanges')}</p>;
    }

    return (
      <div className="space-y-3">
        {changedFields.map(fieldName => {
          const field = fields.find(f => f.name === fieldName);
          const previousValue = previousValues?.[fieldName];
          const newValue = newValues?.[fieldName];
          const fieldLabel = field?.label || fieldName;

          return (
            <div key={fieldName} className="rounded-lg border bg-muted/30 p-3">
              <div className="mb-2">
                <span className="font-medium text-foreground">{fieldLabel}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    {t('history.previousValue')}
                  </label>
                  <div className="mt-1">
                    {formatValue(previousValue, field?.type || 'string')}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    {t('history.newValue')}
                  </label>
                  <div className="mt-1">
                    {formatValue(newValue, field?.type || 'string')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn(cardVariants(), 'p-6', className)}>
      <div className="mb-6">
        <h3 className={text.h3}>{t('history.title')}</h3>
        <p className={text.muted}>
          Track all changes made to this {entityName} entity
        </p>
      </div>

      <div className="space-y-4">
        {history.map((item, index) => {
          const isExpanded = expandedItems.has(item.id);
          const showItemDetails = showDetails.has(item.id);
          const isLast = index === history.length - 1;

          return (
            <div key={item.id} className="relative">
              {/* Timeline connector */}
              {!isLast && (
                <div className="absolute left-6 top-8 h-full w-px bg-border" />
              )}

              <div className="relative flex gap-4">
                {/* Action indicator */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-border">
                  {getActionIcon(item.action)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        badgeVariants({ variant: 'outline' }),
                        getActionColor(item.action)
                      )}>
                        {item.action}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleDetails(item.id)}
                        className={cn(
                          buttonVariants({ variant: 'ghost', size: 'sm' }),
                          'h-8 w-8 p-0'
                        )}
                      >
                        {showItemDetails ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className={cn(
                          buttonVariants({ variant: 'ghost', size: 'sm' }),
                          'h-8 w-8 p-0'
                        )}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{item.createdBy || 'System'}</span>
                  </div>

                  {/* Changes summary */}
                  {isExpanded && (
                    <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                      <div className="mb-3">
                        <h4 className="font-medium">{t('history.changes')}</h4>
                      </div>
                      
                      {showItemDetails ? (
                        renderChanges(
                          item.changes,
                          item.previousValues,
                          item.newValues
                        )
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {Object.keys(item.changes).length} field(s) changed
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}