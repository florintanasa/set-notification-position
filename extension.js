/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import Clutter from 'gi://Clutter';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class NotificationPosition extends Extension {
    _settings;
    _bannerPositionChangedId = 0;
    _bannerActor = null;

    constructor(metadata) {
        super(metadata);
        this._bannerActor = Main.messageTray._bannerBin ?? Main.messageTray.actor ?? null;
        this._originalBannerAlignment = Main.messageTray.bannerAlignment;
        this._originalYAlign = (this._bannerActor && this._bannerActor.get_y_align)
            ? this._bannerActor.get_y_align()
            : Clutter.ActorAlign.START;
    }

    enable() {
        // Get Settings
        this._settings = this.getSettings();
        // Connect to change banner position changes
        this._bannerPositionChangedId = this._settings.connect(
            "changed::change-banner-position",
            this._onChangeBannerPosition.bind(this)
        );
        // Initial notification banner position
        this._onChangeBannerPosition();
    }

    disable() {
        this._original();
        if (this._settings && this._bannerPositionChangedId) {
            this._settings.disconnect(this._bannerPositionChangedId);
        }
        this._settings = null;
    }

    _onChangeBannerPosition() {
        // Get current position
        const bannerPositon = this._settings?.get_int('change-banner-position');
        // check and chose the method
        if (bannerPositon == 0) {
            this.rightBottom();
        }
        else if (bannerPositon == 1) {
            this.rightCenter();
        }
        else if (bannerPositon == 2) {
            this.rightUpper();
        }
        else if (bannerPositon == 3) {
            this.middleBottom();
        }
        else if (bannerPositon == 4) {
            this.middleCenter();
        }
        else if (bannerPositon == 5) {
            this.middleUpper();
        }
        else if (bannerPositon == 6) {
            this.leftBottom();
        }
        else if (bannerPositon == 7) {
            this.leftCenter();
        }
        else if (bannerPositon == 8) {
            this.leftUpper();
        }
    }

    leftUpper() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.START;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.START);
    }

    leftCenter() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.START;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.CENTER);
    }

    leftBottom() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.START;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.END);
    }

    rightUpper() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.END;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.START);
    }

    rightCenter() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.END;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.CENTER);
    }

    rightBottom() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.END;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.END);
    }

    middleUpper() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.CENTER;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.START);
    }

    middleCenter() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.CENTER;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.CENTER);
    }

    middleBottom() {
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.CENTER;
        this._bannerActor && this._bannerActor.set_y_align?.(Clutter.ActorAlign.END);
    }

    _original() {
        Main.messageTray.bannerAlignment = this._originalBannerAlignment;
        this._bannerActor && this._bannerActor.set_y_align?.(this._originalYAlign);
    }
}
