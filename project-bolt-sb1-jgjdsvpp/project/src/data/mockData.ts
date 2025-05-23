import { User, UserRole } from '../contexts/AuthContext';

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    name: '张三（管理员）',
    role: 'admin',
    permissions: [
      'users.view', 'users.create', 'users.edit', 'users.delete',
      'content.view', 'content.create', 'content.edit', 'content.publish',
      'settings.view', 'settings.security', 'settings.roles', 'settings.system'
    ]
  },
  {
    id: 2,
    username: 'manager',
    name: '李四（经理）',
    role: 'manager',
    permissions: [
      'users.view', 'users.create', 'users.edit',
      'content.view', 'content.create', 'content.edit', 'content.publish',
      'settings.view', 'settings.security'
    ]
  },
  {
    id: 3,
    username: 'user',
    name: '王五（普通用户）',
    role: 'user',
    permissions: [
      'content.view', 'content.create', 'content.edit'
    ]
  },
  {
    id: 4,
    username: 'guest',
    name: '赵六（访客）',
    role: 'guest',
    permissions: [
      'content.view'
    ]
  }
];

// 模拟内容数据
export const mockContent = [
  {
    id: 1,
    title: '权限系统设计指南',
    description: '详细介绍如何设计一个灵活可扩展的权限系统。',
    author: '张三',
    status: 'published',
    created_at: '2025-04-15'
  },
  {
    id: 2,
    title: 'RBAC模型的实现方式',
    description: '基于角色的访问控制（RBAC）在Web应用中的实现。',
    author: '李四',
    status: 'draft',
    created_at: '2025-04-20'
  },
  {
    id: 3,
    title: '前端权限控制最佳实践',
    description: '探讨前端如何有效实现权限控制，确保UI安全。',
    author: '王五',
    status: 'published',
    created_at: '2025-04-22'
  },
  {
    id: 4,
    title: '权限管理系统演示视频',
    description: '权限系统设计与实现的详细演示视频教程。',
    author: '张三',
    status: 'draft',
    created_at: '2025-04-25'
  },
  {
    id: 5,
    title: '权限与安全的关系探讨',
    description: '权限管理如何影响整体系统安全性的研究。',
    author: '李四',
    status: 'published',
    created_at: '2025-04-28'
  }
];

// 权限列表
export const mockPermissionsList = [
  {
    group: 'users',
    groupName: '用户管理',
    permissions: [
      { key: 'users.view', name: '查看用户' },
      { key: 'users.create', name: '创建用户' },
      { key: 'users.edit', name: '编辑用户' },
      { key: 'users.delete', name: '删除用户' }
    ]
  },
  {
    group: 'content',
    groupName: '内容管理',
    permissions: [
      { key: 'content.view', name: '查看内容' },
      { key: 'content.create', name: '创建内容' },
      { key: 'content.edit', name: '编辑内容' },
      { key: 'content.publish', name: '发布内容' }
    ]
  },
  {
    group: 'settings',
    groupName: '系统设置',
    permissions: [
      { key: 'settings.view', name: '查看设置' },
      { key: 'settings.security', name: '安全设置' },
      { key: 'settings.roles', name: '角色设置' },
      { key: 'settings.system', name: '系统配置' }
    ]
  }
];