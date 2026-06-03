import React from 'react'
import {
  Activity, AlertTriangle, AlignLeft, ArrowRightLeft, ArrowUpCircle, BarChart, Barcode, Binary, BookOpen, Bot, Calendar, CaseSensitive, CheckCircle, ChevronRight, ClipboardList, Clock, Code, Code2, Compass, Copy, CreditCard, Database, DollarSign, Eraser, Eye, EyeOff, FileCode, FileJson, FileSearch, FileSignature, FileSpreadsheet, FileText, Fingerprint, FolderTree, GitCompare, Globe, Hash, HelpCircle, Hexagon, Image, Key, Layers, Layout, Link, Link2Off, List, ListOrdered, Lock, Map, MapPin, Maximize, Minimize, Monitor, Network, Palette, Play, QrCode, RefreshCw, Repeat, Ruler, Search, Server, Settings, Share2, Shield, ShieldAlert, ShieldCheck, Smartphone, Smile, Sparkles, Star, Table, Tablet, TrendingUp, Twitter, Type, Undo, UserCheck, UserX, Volume2, Webhook, WifiOff, Zap
} from 'lucide-react'

interface DynamicIconProps extends React.ComponentProps<'svg'> {
  name: string
  fallback?: string
}

export const ICON_MAP: Record<string, boolean> = {
  'Activity': true,
  'AlertTriangle': true,
  'AlignLeft': true,
  'ArrowRightLeft': true,
  'ArrowUpCircle': true,
  'BarChart': true,
  'Barcode': true,
  'Binary': true,
  'BookOpen': true,
  'Bot': true,
  'Calendar': true,
  'CaseSensitive': true,
  'CheckCircle': true,
  'ChevronRight': true,
  'ClipboardList': true,
  'Clock': true,
  'Code': true,
  'Code2': true,
  'Compass': true,
  'Copy': true,
  'CreditCard': true,
  'Database': true,
  'DollarSign': true,
  'Eraser': true,
  'Eye': true,
  'EyeOff': true,
  'FileCode': true,
  'FileJson': true,
  'FileSearch': true,
  'FileSignature': true,
  'FileSpreadsheet': true,
  'FileText': true,
  'Fingerprint': true,
  'FolderTree': true,
  'GitCompare': true,
  'Globe': true,
  'Hash': true,
  'HelpCircle': true,
  'Hexagon': true,
  'Image': true,
  'Key': true,
  'Layers': true,
  'Layout': true,
  'Link': true,
  'Link2Off': true,
  'List': true,
  'ListOrdered': true,
  'Lock': true,
  'Map': true,
  'MapPin': true,
  'Maximize': true,
  'Minimize': true,
  'Monitor': true,
  'Network': true,
  'Palette': true,
  'Play': true,
  'QrCode': true,
  'RefreshCw': true,
  'Repeat': true,
  'Ruler': true,
  'Search': true,
  'Server': true,
  'Settings': true,
  'Share2': true,
  'Shield': true,
  'ShieldAlert': true,
  'ShieldCheck': true,
  'Smartphone': true,
  'Smile': true,
  'Sparkles': true,
  'Star': true,
  'Table': true,
  'Tablet': true,
  'TrendingUp': true,
  'Twitter': true,
  'Type': true,
  'Undo': true,
  'UserCheck': true,
  'UserX': true,
  'Volume2': true,
  'Webhook': true,
  'WifiOff': true,
  'Zap': true
}

export default function DynamicIcon({ name, fallback = 'Zap', ...props }: DynamicIconProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity {...props} />
      case 'AlertTriangle': return <AlertTriangle {...props} />
      case 'AlignLeft': return <AlignLeft {...props} />
      case 'ArrowRightLeft': return <ArrowRightLeft {...props} />
      case 'ArrowUpCircle': return <ArrowUpCircle {...props} />
      case 'BarChart': return <BarChart {...props} />
      case 'Barcode': return <Barcode {...props} />
      case 'Binary': return <Binary {...props} />
      case 'BookOpen': return <BookOpen {...props} />
      case 'Bot': return <Bot {...props} />
      case 'Calendar': return <Calendar {...props} />
      case 'CaseSensitive': return <CaseSensitive {...props} />
      case 'CheckCircle': return <CheckCircle {...props} />
      case 'ChevronRight': return <ChevronRight {...props} />
      case 'ClipboardList': return <ClipboardList {...props} />
      case 'Clock': return <Clock {...props} />
      case 'Code': return <Code {...props} />
      case 'Code2': return <Code2 {...props} />
      case 'Compass': return <Compass {...props} />
      case 'Copy': return <Copy {...props} />
      case 'CreditCard': return <CreditCard {...props} />
      case 'Database': return <Database {...props} />
      case 'DollarSign': return <DollarSign {...props} />
      case 'Eraser': return <Eraser {...props} />
      case 'Eye': return <Eye {...props} />
      case 'EyeOff': return <EyeOff {...props} />
      case 'FileCode': return <FileCode {...props} />
      case 'FileJson': return <FileJson {...props} />
      case 'FileSearch': return <FileSearch {...props} />
      case 'FileSignature': return <FileSignature {...props} />
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} />
      case 'FileText': return <FileText {...props} />
      case 'Fingerprint': return <Fingerprint {...props} />
      case 'FolderTree': return <FolderTree {...props} />
      case 'GitCompare': return <GitCompare {...props} />
      case 'Globe': return <Globe {...props} />
      case 'Hash': return <Hash {...props} />
      case 'HelpCircle': return <HelpCircle {...props} />
      case 'Hexagon': return <Hexagon {...props} />
      // eslint-disable-next-line jsx-a11y/alt-text
      case 'Image': return <Image {...props} />
      case 'Key': return <Key {...props} />
      case 'Layers': return <Layers {...props} />
      case 'Layout': return <Layout {...props} />
      case 'Link': return <Link {...props} />
      case 'Link2Off': return <Link2Off {...props} />
      case 'List': return <List {...props} />
      case 'ListOrdered': return <ListOrdered {...props} />
      case 'Lock': return <Lock {...props} />
      case 'Map': return <Map {...props} />
      case 'MapPin': return <MapPin {...props} />
      case 'Maximize': return <Maximize {...props} />
      case 'Minimize': return <Minimize {...props} />
      case 'Monitor': return <Monitor {...props} />
      case 'Network': return <Network {...props} />
      case 'Palette': return <Palette {...props} />
      case 'Play': return <Play {...props} />
      case 'QrCode': return <QrCode {...props} />
      case 'RefreshCw': return <RefreshCw {...props} />
      case 'Repeat': return <Repeat {...props} />
      case 'Ruler': return <Ruler {...props} />
      case 'Search': return <Search {...props} />
      case 'Server': return <Server {...props} />
      case 'Settings': return <Settings {...props} />
      case 'Share2': return <Share2 {...props} />
      case 'Shield': return <Shield {...props} />
      case 'ShieldAlert': return <ShieldAlert {...props} />
      case 'ShieldCheck': return <ShieldCheck {...props} />
      case 'Smartphone': return <Smartphone {...props} />
      case 'Smile': return <Smile {...props} />
      case 'Sparkles': return <Sparkles {...props} />
      case 'Star': return <Star {...props} />
      case 'Table': return <Table {...props} />
      case 'Tablet': return <Tablet {...props} />
      case 'TrendingUp': return <TrendingUp {...props} />
      case 'Twitter': return <Twitter {...props} />
      case 'Type': return <Type {...props} />
      case 'Undo': return <Undo {...props} />
      case 'UserCheck': return <UserCheck {...props} />
      case 'UserX': return <UserX {...props} />
      case 'Volume2': return <Volume2 {...props} />
      case 'Webhook': return <Webhook {...props} />
      case 'WifiOff': return <WifiOff {...props} />
      case 'Zap': return <Zap {...props} />
      default: return null;
    }
  }
  
  const IconComponent = renderIcon(name)
  
  if (!IconComponent) {
    if (fallback !== name) {
      return renderIcon(fallback) || <Zap {...props} />
    }
    return <Zap {...props} />
  }
  
  return IconComponent
}
