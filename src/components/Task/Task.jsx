/* eslint-disable no-unused-vars */
import { formatDistanceToNow } from 'date-fns'
import cn from 'classnames'

import Timer from '../Timer'

export default function Task({ task, onRemoveTask, onCompletedTaskChange }) {
  return (
    <li className={cn({ completed: task.isCompleted })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onCompletedTaskChange(task.id)}
        />
        <label>
          <span className="title">{task.content}</span>
          <Timer taskCompleted={task.isCompleted}></Timer>
          <span className="description">created {formatDistanceToNow(task.creationTime)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => onRemoveTask(task.id)}></button>
      </div>
    </li>
  )
}
