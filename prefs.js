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
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class SetNotificationPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const preferences = this.getSettings();
        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            iconName: 'dialog-information-symbolic',
        });
        window.add(page);
        const GeneralGroup = new Adw.PreferencesGroup({
            title: _('Notification Position'),
            description: _('Setting notification banner position on screen'),
        });
        page.add(GeneralGroup);
        const items = Gtk.StringList.new([
            _('Right Bottom'),
            _('Right Center'),
            _('Right Upper'),
            _('Middle Bottom'),
            _('Middle Center'),
            _('Middle Upper'),
            _('Left Bottom'),
            _('Left Center'),
            _('Left Upper'),
        ]);
        // Create a new preferences row
        const row = new Adw.ComboRow({
            model: items,
            selected: preferences.get_int('change-banner-position'),
        });
        GeneralGroup.add(row);
        row.connect('notify::selected', () => {
            preferences.set_int('change-banner-position', row.selected);
        });
    }
}