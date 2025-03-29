import { formatDistanceToNow } from 'date-fns'
import cn from 'classnames'

import Timer from '../Timer'

export default function Task({ id, content, creationTime, isCompleted, onRemoveTask, onCompletedTaskChange }) {
  return (
    <li className={cn({ completed: isCompleted })}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={isCompleted} onChange={() => onCompletedTaskChange(id)} />
        <label>
          <span className="title">{content}</span>
          <Timer></Timer>
          <span className="description">created {formatDistanceToNow(creationTime)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => onRemoveTask(id)}></button>
      </div>
    </li>
  )
}
