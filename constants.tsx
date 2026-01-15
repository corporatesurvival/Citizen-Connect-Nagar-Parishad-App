
import React from 'react';
import { Trash2, Droplets, Zap, Ruler, Lightbulb, FileText, BadgeCheck, LayoutDashboard } from 'lucide-react';
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'garbage', name: 'Garbage', icon: 'Trash2', color: 'bg-orange-500' },
  { id: 'water', name: 'Water Supply', icon: 'Droplets', color: 'bg-blue-500' },
  { id: 'electricity', name: 'Electricity', icon: 'Zap', color: 'bg-yellow-500' },
  { id: 'roads', name: 'Roads', icon: 'Ruler', color: 'bg-gray-600' },
  { id: 'streetlights', name: 'Street Lights', icon: 'Lightbulb', color: 'bg-amber-400' },
  { id: 'tax', name: 'Property Tax', icon: 'FileText', color: 'bg-emerald-500' },
  { id: 'certificates', name: 'Certificates', icon: 'BadgeCheck', color: 'bg-purple-500' },
  { id: 'others', name: 'Other Services', icon: 'LayoutDashboard', color: 'bg-teal-500' },
];

export const APP_SLOGANS = [
  "Any citizen can raise a complaint in 2 minutes.",
  "Digital Council - Smart Citizen",
  "One click - A thousand solutions",
  "Your voice, our priority"
];

export const getIcon = (iconName: string, size = 24, className = "") => {
  const icons: Record<string, any> = { Trash2, Droplets, Zap, Ruler, Lightbulb, FileText, BadgeCheck, LayoutDashboard };
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};
